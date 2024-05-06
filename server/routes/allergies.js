const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");

// ALLERGIES
router.post(
    "/new-allergy",
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
  router.delete(
    "/delete-allergy",
    authenticateToken(["admin"]),
    async (req, res) => {
      try {
        const deletedAllergy = await db.collection("students").updateOne(
          { userId: req.body.userId },
          {
            $pull: {
              allergies: { allergy: req.body.allergy },
            },
          }
        );
        if (deletedAllergy.modifiedCount === 0) {
          throw new Error("Allergy not found for userId " + req.body.userId + " and allergy " + req.body.allergy);
        }
  
        res.json({
          error: false,
          message: "Allergy deleted successfully",
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          error: true,
          message: "Error deleting allergy",
        });
      }
    }
  );

  module.exports = router;