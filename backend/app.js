import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import conn from "./db.js";
import registerRoute from "./routes/register.js";
import loginRoute from "./routes/login.js";
import resetPassRoute from "./routes/reset_password.js";
import seatBookingRoute from "./routes/seat_booking.js";
import reserveSeatsRoute from "./routes/reserve_seats.js";
import fetchLocs from "./routes/fetch_locations.js";
import userTickets from "./routes/user_tickets.js";


const urlEncodedParser = bodyParser.urlencoded({extended : true});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// ------------ ROUTES --------------

app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/reset_password", resetPassRoute);
app.use("/seat_booking", seatBookingRoute);
app.use("/reserve_seats", reserveSeatsRoute);
app.use("/fetch_locations", fetchLocs);
app.use("/user_tickets", userTickets);


// ----------------------------------


app.listen(5000, () => {
    console.log("Server connected at port http://localhost:5000");
})