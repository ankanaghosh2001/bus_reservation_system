import bodyParser from "body-parser";
import express from "express";
import conn from "../db.js";
import bcrypt from 'bcrypt';

const router = express.Router();
const urlEncodedParser = bodyParser.urlencoded({extended: true});


router.post('/', urlEncodedParser, async(req, res) => {
    const {username, phone, password} = req.body;


    const query = 'select * from users where phone = ?';

    conn.query(query, [phone], async (err, results) => {
        if(err){
            console.log("Login Query Error!", err);
            return res.status(500).send("Server Error!");
        }

        if(results.length === 0){
            return res.status(401).send("User not found!")
        }

        const user = results[0]

        if(user.username !== username){
            return res.status(401).send("Incorrect Username");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            return res.status(401).send("Incorrect Password");
        }

        res.status(200).send("Login Successful");
    })
})

export default router;