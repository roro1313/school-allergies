const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
const MongoClient = mongodb.MongoClient;
const url = "mongodb+srv://username:password@your-cluster.mongodb.net/tfg-project"; // URL database connection
const dbName = "tfg-project";

// API routes
app.get("/usuarios", async (req, res) => {
  const client = new MongoClient(url);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("usuarios");
    const usuarios = await collection.find({}).toArray();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  } finally {
    await client.close();
  }
});

app.get("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const client = new MongoClient(url);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("usuarios");
    const usuario = await collection.findOne({ _id: mongodb.ObjectID(id) });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener usuario" });
  } finally {
    await client.close();
  }
});

app.post("/usuarios", async (req, res) => {
  const nuevoUsuario = req.body;
  const client = new MongoClient(url);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("usuarios");
    const resultado = await collection.insertOne(nuevoUsuario);
    res.status(201).json(resultado.ops[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear usuario" });
  } finally {
    await client.close();
  }
});

// Otras rutas para editar y eliminar usuarios

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
