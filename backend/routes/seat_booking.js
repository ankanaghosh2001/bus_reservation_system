import express from "express";
import bodyParser from "body-parser";
import conn from "../db.js";

const router = express.Router();
const urlEncodedParser = bodyParser.urlencoded({extended: true});

router.get('/', (req, res) => {
    const {source, destination, tDate} = req.query;

    const query1 = `SELECT fare, RID FROM trip_details WHERE (source = ? AND destination = ?) OR (source = ? AND destination = ?)`;

    conn.query(query1, [source, destination, destination, source], (err, result) => {
        if(err){
            return res.status(500).send("Server error!");
        }
        if(result.length === 0){
            return res.status(401).send("No such bus routes exist");
        }

        const fare = result[0].fare;
        const RID = result[0].RID;

        const query2 = `select id from trip_instances where (RID = ? and tDate = ?)`;

        conn.query(query2, [RID, tDate], (err, result) => {
            if(err){
                return res.status(500).send("Server Error!");
            }
            let trip_instance_id;
            if(result.length === 0){
                const query3 = `insert into trip_instances (RID, tDate) values (?, ?)`;

                conn.query(query3, [RID, tDate], (err, result) => {
                    if(err){
                        return res.status(500).send("Data cannot be inserted!");
                    }
                    trip_instance_id = result.insertId;
                })
            }
            else{
                trip_instance_id = result[0].id;
            }

            const query4 = `select seat_number from booked_seats where trip_id = ?`;
            conn.query(query4, [trip_instance_id], (err, result) => {
                if(err){
                    return res.status(500).send("Server Error!");
                }
                const bookedSeats = result.map(row => row.seat_number);

                return res.status(200).json({ success: true, fare, bookedSeats, trip_instance_id });
            })
        })

    })
})

export default router;