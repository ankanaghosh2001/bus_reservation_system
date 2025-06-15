import express from "express";
import bodyParser from "body-parser";
import conn from "../db.js";

const router = express.Router();

const urlEncodedParser = bodyParser.urlencoded({ extended: true });

router.get('/', urlEncodedParser, (req, res) => {
    const sourceQuery = "SELECT DISTINCT source FROM trip_details";
    const destQuery = "SELECT DISTINCT destination FROM trip_details";

    let sourceLocs = [];
    let destLocs = [];

    conn.query(sourceQuery, (err, sourceResult) => {
        if (err) {
            return res.status(500).send("Error fetching sources!");
        }

        sourceLocs = sourceResult.map(row => row.source);

        conn.query(destQuery, (err, destResult) => {
            if (err) {
                return res.status(500).send("Error fetching destinations!");
            }

            destLocs = destResult.map(row => row.destination);

            return res.status(200).json({ sourceLocs, destLocs });
        });
    });
});

export default router;