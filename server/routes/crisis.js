const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");

// CRISIS
router.post(
    "/new-crisis",
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
  router.delete(
    "/delete-crisis",
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

  module.exports = router;