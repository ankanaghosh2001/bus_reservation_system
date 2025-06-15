import express from "express";
import bodyParser from "body-parser";
import conn from "../db.js";

const router = express.Router();

const urlEncodedParser = bodyParser.urlencoded({extended: true});

router.post('/', (req, res) => {
  const { trip_id, userID, seatNumbers } = req.body;

  if (!trip_id || !seatNumbers || seatNumbers.length === 0 || !userID){
    return res.status(400).json({ success: false, message: "Missing data" });
  }

  const values = seatNumbers.map(seat => [trip_id, userID, seat]);

  const query = `INSERT INTO booked_seats (trip_id, userID, seat_number) VALUES ?`;

  conn.query(query, [values], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: "Booking failed" });

    res.status(200).json({ success: true, message: "Booking successful" });
  });
});

export default router;