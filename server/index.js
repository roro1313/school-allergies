const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongodb = require("mongodb");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authenticateToken");
const studentsRoutes = require("./routes/students");
const loginRoute = require("./routes/login");
const allergiesRoutes = require("./routes/allergies");
const crisisRoutes = require("./routes/crisis");
const usersRoutes = require("./routes/users");

//app.use(express.static("public"));

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

app.use("/", loginRoute);
app.use("/students", studentsRoutes);
app.use("/students", allergiesRoutes);
app.use("/students", crisisRoutes);
app.use("/users", usersRoutes);

app.listen(process.env.PORT || 3000, (e) => {
  e
    ? console.error("🟥 Server not connected")
    : console.log("🟩 Server connected in " + process.env.PORT || 3000);
});

/* contact: [
  { id: mongodb.ObjectId(), name: "nombre", relationship: "mom", phone: "phone" },
  { id: mongodb.ObjectId(), name: "nombre", relationship: "dad", phone: "phone" },
]; */
