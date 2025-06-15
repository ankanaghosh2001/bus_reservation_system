import express from "express";
import bodyParser from "body-parser";
import conn from "../db.js";

const router = express.Router();

const urlEncodedParser = bodyParser.urlencoded({ extended: true });

router.get('/', urlEncodedParser, (req, res) => {
    const query = `select * from trip_details`;

    conn.query(query, [], (err, result) => {
        if(err){
            return res.status(500).send("Server Error!");
        }

        let size = result.length;
        let sourceLocs = [];
        let destLocs = []

        for(let i=0;i<size;i++){
            sourceLocs.push(result[i].source);
            destLocs.push(result[i].destination);
        }

        return res.status(200).json({ sourceLocs, destLocs});
    })
})

export default router;