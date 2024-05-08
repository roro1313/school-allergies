const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const jwt = require("jsonwebtoken");

// LOGIN
router.post("/login", async (req, res) => {
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

module.exports = router;