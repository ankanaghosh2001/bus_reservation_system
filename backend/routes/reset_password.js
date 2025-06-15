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

        conn.beginTransaction((err) => {
            if (err) throw err;

            const query = 'update users set password = ? where phone = ? and username = ?';
            conn.query(query, [hashedPassword, phone, username], (err, result) => {
                if (err) {
                    return conn.rollback(() => {
                        console.error("Password Updation Error:", err);
                        res.status(500).send("Password Updation Failed");
                    });
                }

                if (result.affectedRows === 0) {
                    return res.status(404).send("User not found or invalid details");
                }

                conn.commit((err) => {
                    if (err) {
                        return conn.rollback(() => {
                            console.error("Commit Error:", err);
                            res.status(500).send("Password couldn't be reset!");
                        });
                    }

                    res.status(200).send("Password Updated successfully");
                });
            });
        });
    } catch (error) {
        console.error("Hashing Error:", error);
        res.status(500).send("Server error while hashing password");
    }
})

export default router;