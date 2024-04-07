const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const mongodb = require("mongodb");

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
const MongoClient = mongodb.MongoClient;
const url = process.env.DATABASE_URL;
const dbName = "tfg-project";

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

app.get("/students", async (req, res) => {
  if (!db) {
    return res.send({ error: true, response: "🟥 Database not connected" });
  }

  try {
    const students = await db.collection("students").find().toArray();
    students.length === 0
      ? res.send({ error: true, response: "No hay resultados" })
      : res.send({ error: false, response: students });
  } catch (error) {
    res.send({ error: true, response: error });
  }
});

app.post("/students/new-student", async (req, res) => {
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

app.post("/students/new-allergy", async (req, res) => {
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

app.post("/students/new-crisis", async (req, res) => {
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
