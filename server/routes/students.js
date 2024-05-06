const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");

// SEARCH
router.post(
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
router.post(
    "/new-student",
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
  
  router.post(
    "/edit-student",
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
  
  router.delete(
    "/delete-student",
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

  module.exports = router;