import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import SeatBox from "./SeatBox";
import userIcon from "../assets/user2.svg";
import switchIcon from "../assets/on-off2.svg";

const SeatBoookingPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const [person, setPerson] = useState(0);
  const [fare, setFare] = useState(0);
  const [farePerPerson, setFarePerPerson] = useState(0);
  const [username, setUsername] = useState("");
  const [bookedSeats, setBookedSeats] = useState([]);
  const [travelDate, setTravelDate] = useState("");
  const [tripInstanceId, setTripInstanceId] = useState(null);
  const [sourceLocs, setSourceLocs] = useState([]);
  const [destLocs, setDestLocs] = useState([]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      toast.error("Please log in to access booking page");
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchLocs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/fetch_locations");
        if (res.status === 200) {
          const { sourceLocs, destLocs } = res.data;
          setSourceLocs(sourceLocs);
          setDestLocs(destLocs);
        }
      } catch (err) {
        console.error("Failed to fetch locations:", err);
      }
    };

    fetchLocs();
  }, []);

  const handleLogout = () => {
    let confirmation = window.confirm("Do you want to log-out?");
    if (confirmation) {
      localStorage.removeItem("username");
      localStorage.removeItem("userID");
      navigate("/");
    }
  };

  const setJourney = async (data) => {
    try {
      const response = await axios.get("http://localhost:5000/seat_booking", {
        params: {
          source: data.source,
          destination: data.destination,
          tDate: data.tDate,
        },
      });
      if (response.status === 200) {
        const { fare, bookedSeats, trip_instance_id } = response.data;
        setFare(fare);
        setFarePerPerson(response.data.fare);
        localStorage.setItem("fare", response.data.fare);
        setBookedSeats(bookedSeats || []);
        setTripInstanceId(trip_instance_id);
      } else {
        alert(response.error);
      }
    } catch (error) {
      console.log("Error fetching fare:", error);
      alert("Error Fetching Fare!!!");
    }
  };

  const updatePersonCount = (isSelected) => {
    setPerson((prev) => {
      const newPerson = isSelected ? prev + 1 : prev - 1;
      setFare(newPerson * farePerPerson);
      return newPerson;
    });
  };

  const handlePayment = async () => {
    const selectedSeats = document.querySelectorAll(".seat.checked");
    const seatNumbers = Array.from(selectedSeats).map((seat) =>
      parseInt(seat.dataset.number)
    );
    console.log(seatNumbers);

    const storedUserID = localStorage.getItem("userID");

    if (seatNumbers.length === 0) {
      toast.error("Please select at least one seat");
      return;
    }

    console.log(storedUserID, tripInstanceId);

    try {
      const response = await axios.post("http://localhost:5000/reserve_seats", {
        trip_id: tripInstanceId,
        userID: storedUserID,
        seatNumbers,
      });

      if (response.data.success) {
        toast.success(
          "Booking Successful! Check your ticket in your profile section."
        );
      } else {
        toast.error("Booking Failed" + response.data.message);
      }
    } catch {
      toast.error("Server Failure ! Seat Booking Failed");
    }
  };

  return (
    <>
      <div className="userSection">
        <img src={userIcon} alt="" />
        <h3>
          <Link to={`/user/${username}`} className="username-link">
            Hello, {username}
          </Link>
        </h3>
        <img src={switchIcon} alt="" />
        <h3 id="logout" onClick={handleLogout}>
          Log-Out
        </h3>
      </div>
      <div className="reservationContainer">
        <div className="tripDetails">
          <div className="heading">
            <h3>Trip Details</h3>
          </div>
          <form action="" onSubmit={handleSubmit(setJourney)}>
            <label htmlFor="from">From : </label>
            <br />
            <select id="source" {...register("source", { required: true })}>
              <option value="" disabled selected>
                -- Select Source --
              </option>
              {sourceLocs.map((loc, idx) => (
                <option key={idx} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <br />
            <label htmlFor="to">To : </label>
            <br />
            <select
              id="destination"
              {...register("destination", { required: true })}
            >
              <option value="" disabled selected>
                -- Select Destination --
              </option>
              {destLocs.map((loc, idx) => (
                <option key={idx} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <br />
            <label htmlFor="tDate">Date : </label>
            <input
              type="date"
              name="tDate"
              id="tDate"
              onChange={(e) => setTravelDate(e.target.value)}
              {...register("tDate", { required: true })}
            />
            <br />
            <input type="submit" value="Submit" />
          </form>
          <div className="persons">
            <h3>Persons Travelling: {person}</h3>
          </div>
          <div className="fare">
            <h3>Fare : {fare}</h3>
          </div>
          <div className="payFare">
            <button type="submit" onClick={handlePayment}>
              Pay Now
            </button>
            <ToastContainer />
          </div>
        </div>

        <div className="seat-layout" id="seat-layout">
          <div className="heading">
            <h3>Seat Layout (Select Your Seats)</h3>
          </div>
          <div className="seats">
            <div className="left-seats">
              {Array.from({ length: 24 }, (_, i) => (
                <SeatBox
                  key={i + 1}
                  seatNumber={i + 1}
                  id={"seat" + (i + 1)}
                  onToggle={updatePersonCount}
                  isBooked={bookedSeats.includes(i + 1)}
                />
              ))}
            </div>
            <div className="right-seats">
              {Array.from({ length: 24 }, (_, i) => (
                <SeatBox
                  key={i + 25}
                  seatNumber={i + 25}
                  id={"seat" + (i + 25)}
                  onToggle={updatePersonCount}
                  isBooked={bookedSeats.includes(i + 25)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeatBoookingPage;
