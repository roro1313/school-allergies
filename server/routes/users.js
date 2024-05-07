const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");

// SEARCH
router.post(
  "/",
  authenticateToken(["admin"]),
  async (req, res) => {
    try {
      const searchQuery = {
        username: { $regex: req.body.username, $options: "i" },
      };
      const users = await db
        .collection("user-data-login")
        .find(searchQuery)
        .toArray();

      if (users.length === 0) {
        res.send({ error: true, response: "No results" });
      } else {
        res.send({
          error: false,
          response: users,
        });
      }
    } catch (error) {
      res.send({ error: true, response: error });
    }
  }
);

// USERS
router.post(
  "/new-user",
  authenticateToken(["admin"]),
  async (req, res) => {
    try {
      const existingUser = await db.collection("user-data-login").findOne({ username: req.body.username });
      if (existingUser) {
        return res.status(400).json({
          error: true,
          message: "Username already exists"
        });
      }
      const newUser = await db.collection("user-data-login").insertOne({
        username: req.body.username,
        usertype: req.body.usertype,
        password: req.body.password,
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
  router.put(
    "/edit-user",
    authenticateToken(["admin"]),
    async (req, res) => {
      try {
        const updatedUser = await db.collection("user-data-login").updateOne(
          { username: req.body.username },
          {
            $set: {
              usertype: req.body.usertype,
              password: req.body.password,
            },
          }
        );
        if (updatedUser.modifiedCount === 0) {
          throw new Error("User not found for username " + req.body.username);
        }
  
        res.json({
          error: false,
          message: "User information updated successfully",
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          error: true,
          message: "Error updating user information",
        });
      }
    }
  );
  router.delete(
    "/delete-user",
    authenticateToken(["admin"]),
    async (req, res) => {
      try {
        const deletedUser = await db.collection("user-data-login").deleteOne(
          { username: req.body.username }
        );
        if (deletedUser.deletedCount === 0) {
          throw new Error("User not found for username " + req.body.username);
        }
  
        res.json({
          error: false,
          message: "User deleted successfully",
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          error: true,
          message: "Error deleting user",
        });
      }
    }
  );

module.exports = router;