const express = require("express");

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

module.exports = authenticateToken;