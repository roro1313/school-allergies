const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongodb = require("mongodb");
const jwt = require("jsonwebtoken");

//app.use(express.static("public"));

// JWT authentication middleware
function authenticateToken(usertypes) {
  return function (req, res, next) {
    const token = req.headers.authorization;
    const usertype = req.headers.usertype;
    if (!token)
      return res.status(401).json({ error: true, message: "🟥 Unauthorized" });

    if (!usertypes.includes(usertype)) {
      return res.status(403).json({ error: true, message: "🟥 Forbidden" });
    }
    next();
  };
}

// Middleware bodyparser
app.use(bodyParser.json());

app.use(express.json());
app.use(cors());

// MongoDB Connection
const MongoClient = mongodb.MongoClient;

async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const dbs = await client.db().admin().listDatabases();
    dbs.length !== 0
      ? ((db = client.db("tfg-project")),
        console.log("🟩 Database successfully connected"))
      : console.error(error + "🟥 Error in database connection");
  } catch (error) {
    console.error(error);
  }
}

connectToDatabase();

// LOGIN
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({
          error: true,
          message: "🟥 Username and password are required",
        });
    }

    const userdata = await db
      .collection("user-data-login")
      .findOne({ username, password });
    if (!userdata) {
      return res
        .status(401)
        .json({ error: true, message: "🟥 Invalid username or password" });
    }

    const usertype = userdata.usertype;
    const token = jwt.sign({ username, usertype }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ error: false, message: "Login successful", token, usertype });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "🟥 Internal server error" });
  }
});
// SEARCH
app.post(
  "/students",
  authenticateToken(["admin", "user"]),
  async (req, res) => {
    try {
      const searchQuery = {
        userId: { $regex: req.body.userId, $options: "i" },
      };
      const students = await db
        .collection("students")
        .find(searchQuery)
        .toArray();

      if (students.length === 0) {
        res.send({ error: true, response: "No results" });
      } else {
        res.send({
          error: false,
          response: students,
          Usertype: req.headers.usertype,
        });
      }
    } catch (error) {
      res.send({ error: true, response: error });
    }
  }
);
// STUDENTS
app.post(
  "/students/new-student",
  authenticateToken(["admin"]),
  async (req, res) => {
    try {
      const newStudent = await db.collection("students").insertOne({
        studentName: req.body.studentName,
        studentSurname: req.body.studentSurname,
        studentBirth: req.body.studentBirth,
        studentGrade: req.body.studentGrade,
        allergies: [],
        userId: req.body.studentName + req.body.studentSurname.substring(0, 2),
      });

      res.json({
        error: false,
        response: newStudent,
        message: "Student successfully created",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: true,
        response: error,
        message: "Student not created",
      });
    }
  }
);

app.post(
  "/students/edit-student",
  authenticateToken(["admin"]),
  async (req, res) => {
    try {
      const updatedStudent = await db
        .collection("students")
        .updateOne(
          { userId: userId },
          {
            $set: {
              studentName: req.body.studentName,
              studentSurname: req.body.studentSurname,
              studentBirth: req.body.studentBirth,
              studentGrade: req.body.studentGrade,
            },
          }
        );

      if (updatedStudent.modifiedCount === 0) {
        throw new Error("Student with " + req.body.userId + " not found");
      }

      res.json({
        error: false,
        message: "Student information updated successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: true,
        message: "Error updating student information",
      });
    }
  }
);

app.delete(
  "/students/delete-student",
  authenticateToken(["admin"]),
  async (req, res) => {
    try {
      const userId = req.body.userId;

      const deletedStudent = await db
        .collection("students")
        .deleteOne({ userId: userId });

      if (deletedStudent.deletedCount === 0) {
        throw new Error("Student with userId " + userId + " not found");
      }

      res.json({
        error: false,
        message: "Student deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: true,
        message: "Error deleting student",
      });
    }
  }
);
// ALLERGIES
app.post(
  "/students/new-allergy",
  authenticateToken(["admin", "user"]),
  async (req, res) => {
    try {
      const newAllergy = await db.collection("students").updateOne(
        { userId: req.body.userId },
        {
          $push: {
            allergies: {
              allergy: req.body.allergy,
              medication: req.body.medication,
              crisis: [],
            },
          },
        }
      );
      if (newAllergy.modifiedCount === 0) {
        throw new Error(
          "Allergy can not be created, userId not found " + req.body.userId
        );
      }
      res.json({
        error: false,
        message: "Allergy successfully created",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: true,
        message: "Error al crear la alergia",
      });
    }
  }
);
// CRISIS
app.post(
  "/students/new-crisis",
  authenticateToken(["admin", "user"]),
  async (req, res) => {
    try {
      const newCrisis = await db.collection("students").updateOne(
        { userId: req.body.userId, "allergies.allergy": req.body.allergy },
        {
          $push: {
            "allergies.$.crisis": {
              type: req.body.type,
              timestamp: req.body.timestamp,
              information: req.body.information,
            },
          },
        }
      );

      if (newCrisis.modifiedCount === 0) {
        throw new Error(
          "Crisis can not be created, userId not found " + req.body.userId
        );
      }

      res.json({
        error: false,
        message: "Crisis successfully created",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: true,
        message: "Error creating crisis",
      });
    }
  }
);
app.delete(
  "/students/delete-crisis",
  authenticateToken(["admin"]),
  async (req, res) => {
    try {
      const deletedCrisis = await db.collection("students").updateOne(
        { userId: req.body.userId, "allergies.allergy": req.body.allergy },
        {
          $pull: {
            "allergies.$.crisis": { type: req.body.type },
          },
        }
      );
      if (deletedCrisis.modifiedCount === 0) {
        throw new Error("Crisis not found for userId " + req.body.userId + " and allergy " + req.body.allergy);
      }

      res.json({
        error: false,
        message: "Crisis deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: true,
        message: "Error deleting crisis",
      });
    }
  }
);


// USERS
app.post(
  "/users/new-user",
  authenticateToken(["admin"]),
  async (req, res) => {
    try {
      const newUser = await db.collection("user-data-login").insertOne({
        username: req.body.studentName,
        usertype: req.body.studentSurname,
        password: req.body.studentBirth,
      });

      res.json({
        error: false,
        response: newUser,
        message: "User successfully created",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: true,
        response: error,
        message: "User not created",
      });
    }
  }
);


app.listen(process.env.PORT || 3000, (e) => {
  e
    ? console.error("🟥 Server not connected")
    : console.log("🟩 Server connected in " + process.env.PORT || 3000);
});

/* contact: [
  { id: mongodb.ObjectId(), name: "nombre", relationship: "mom", phone: "phone" },
  { id: mongodb.ObjectId(), name: "nombre", relationship: "dad", phone: "phone" },
]; */
