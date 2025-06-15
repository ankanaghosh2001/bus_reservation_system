import bodyParser from "body-parser";
import express from "express";
import conn from "../db.js";
import bcrypt from 'bcrypt';

const router = express.Router();
const urlEncodedParser = bodyParser.urlencoded({ extended: true });

const saltRounds = 10;

router.post('/', urlEncodedParser, async (req, res) => {
    const { username, phone, password } = req.body;

    try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Step 1: Verify user exists
    const checkQuery = 'SELECT * FROM users WHERE username = ? AND phone = ?';
    conn.query(checkQuery, [username, phone], (err, results) => {
      if (err) {
        console.error("Error checking user:", err);
        return res.status(500).json({ success: false, message: "Server error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      // Step 2: User exists — perform update
      const updateQuery = 'UPDATE users SET password = ? WHERE username = ? AND phone = ?';
      conn.query(updateQuery, [hashedPassword, username, phone], (err, result) => {
        if (err) {
          console.error("Error updating password:", err);
          return res.status(500).json({ success: false, message: "Update failed" });
        }

        return res.status(200).json({ success: true, message: "Password updated successfully" });
      });
    });
  } catch (err) {
    console.error("Hashing error:", err);
    return res.status(500).json({ success: false, message: "Password hashing failed" });
  }
})

export default router;