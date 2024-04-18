const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const jwt = require('jsonwebtoken');

//app.use(express.static("public"));

// Middleware para habilitar CORS
function enableCors(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permite todas las solicitudes de cualquier origen
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Métodos permitidos
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Encabezados permitidos
}

// JWT authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).send({ error: true, message: 'Unauthorized' });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).send({ error: true, message: 'Forbidden' });
  }
}

// Middleware de análisis de cuerpo de solicitud
app.use(bodyParser.json());

// Middleware CORS
app.use(enableCors);


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
    const userData = await db.collection("user-data-login").findOne({ username, password });
    if (!userData) {
      return res.status(401).json({ error: true, message: "🟥 Invalid username or password" });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "🟥 Internal server error" });
  }
});

app.get("/students", authenticateToken, async (req, res) => {
  if (!db) {
    return res.send({ error: true, response: "🟥 Database not connected" });
  }

  try {
    const students = await db.collection("students").find().toArray();
    students.length === 0
      ? res.send({ error: true, response: "No results" })
      : res.send({ error: false, response: students });
  } catch (error) {
    res.send({ error: true, response: error });
  }
});

app.post("/students", authenticateToken, async (req, res) => {
  try {
    const student = await db.collection("students").findOne({ userId: req.body.userId });
    student.length === 0
      ? res.send({ error: true, response: "No results" })
      : res.send({ error: false, response: student });
  } catch (error) {
    res.send({ error: true, response: error });
  }
});

app.post("/students/new-student", authenticateToken, async (req, res) => {
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
});

app.post("/students/new-allergy", authenticateToken, async (req, res) => {
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
      throw new Error("Allergy can not be created, userId not found " + req.body.userId);
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
});

app.post("/students/new-crisis", authenticateToken, async (req, res) => {
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
      throw new Error("Crisis can not be created, userId not found " + req.body.userId);
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
});

app.listen(process.env.PORT || 3000, (e) => {
  e
    ? console.error("🟥 Server not connected")
    : console.log("🟩 Server connected in " + process.env.PORT || 3000);
});

/* contact: [
  { id: mongodb.ObjectId(), name: "nombre", relationship: "mom", phone: "phone" },
  { id: mongodb.ObjectId(), name: "nombre", relationship: "dad", phone: "phone" },
]; */
