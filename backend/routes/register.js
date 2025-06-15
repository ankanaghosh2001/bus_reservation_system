import bodyParser from "body-parser";
import express from "express";
import conn from '../db.js';
import bcrypt from "bcrypt";

const router = express.Router();
const urlEncodedParser = bodyParser.urlencoded({extended : true});

const saltRounds = 10;

router.post('/', urlEncodedParser, async (req, res) => {
    const { username, phone, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        conn.beginTransaction((err) => {
            if (err) throw err;

            const query = 'INSERT INTO users VALUES (?, ?, ?)';
            conn.query(query, [username, phone, hashedPassword], (err, result) => {
                if (err) {
                    return conn.rollback(() => {
                        console.error("Query Error:", err);
                        res.status(500).send("Registration failed");
                    });
                }

                conn.commit((err) => {
                    if (err) {
                        return conn.rollback(() => {
                            console.error("Commit Error:", err);
                            res.status(500).send("Could not save changes");
                        });
                    }

                    res.status(200).send("User registered successfully");
                });
            });
        });
    } catch (error) {
        console.error("Hashing Error:", error);
        res.status(500).send("Server error while hashing password");
    }
});

export default router;