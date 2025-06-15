import express from "express";
import bodyParser from "body-parser";
import conn from "../db.js";

const router = express.Router();
const urlEncodedParser = bodyParser.urlencoded({extended:true});

router.get("/:username", (req, res) => {
  const { username } = req.params;

  const getUserIDQuery = "SELECT phone FROM users WHERE username = ?";
  conn.query(getUserIDQuery, [username], (err, result) => {
    if (err || result.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const userID = result[0].phone;
    const ticketQuery = `
      SELECT 
        MIN(bs.SID) AS ticket_id,
        td.source,
        td.destination,
        COUNT(bs.seat_number) AS persons_travelling,
        td.fare,
        GROUP_CONCAT(bs.seat_number ORDER BY bs.seat_number) AS booked_seats,
        bs.booked_at AS date_time
      FROM 
        booked_seats bs
      JOIN 
        trip_instances ti ON bs.trip_id = ti.id
      JOIN 
        trip_details td ON ti.RID = td.RID
      WHERE 
        bs.userID = ?
      GROUP BY 
        bs.trip_id, bs.booked_at
      ORDER BY 
        bs.booked_at DESC
    `;

    conn.query(ticketQuery, [userID], (err, tickets) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Failed to fetch ticket history" });
      }
      
      res.status(200).json({ success: true, tickets });
    });
  });
});


export default router;