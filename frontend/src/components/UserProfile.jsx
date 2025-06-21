import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { jsPDF } from "jspdf";

const UserProfile = () => {
  const { username } = useParams();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get(`https://bus-anywhere.onrender.com/user_tickets/${username}`);
        if (res.data.success) {
          setTickets(res.data.tickets);
        }
      } catch (err) {
        console.error("Failed to fetch ticket history");
      }
    };
    fetchTickets();
  }, [username]);

  const downloadPDF = (ticket) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Bus.Anywhere Ticket", 90, 20);
    doc.setFontSize(12);

    doc.text(`Username: ${username}`, 20, 40);
    doc.text(`Ticket ID: ${ticket.ticket_id}`, 20, 50);
    doc.text(`Source: ${ticket.source}`, 20, 60);
    doc.text(`Destination: ${ticket.destination}`, 20, 70);
    doc.text(`Persons Travelling: ${ticket.persons_travelling}`, 20, 80);
    doc.text(`Booked Seats: ${ticket.booked_seats}`, 20, 90);
    doc.text(`Fare: Rs.${ticket.fare * ticket.persons_travelling}`, 20, 100);
    doc.text(`Date & Time: ${new Date(ticket.date_time).toLocaleString("en-GB")}`, 20, 110);
    doc.text(`Journey Date: ${new Date(ticket.journey_date).toLocaleDateString("en-GB")}`,20, 120);

    doc.save(`Bus.Anywhere_Ticket_${ticket.ticket_id}.pdf`);
  };

  return (
    <div className='users'>
      <h3>Hello, <span>{username}</span>. Check your previously booked tickets here ⬇️</h3>
      <div className="ticketList" align="center">
      <table>
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Persons Travelling</th>
            <th>Fare(in Rs.)</th>
            <th>Booked Seats</th>
            <th>Date & Time</th>
            <th>Journey Date</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <tr key={index}>
              <td>{ticket.ticket_id}</td>
              <td>{ticket.source}</td>
              <td>{ticket.destination}</td>
              <td>{ticket.persons_travelling}</td>
              <td>{ticket.fare * ticket.persons_travelling}</td>
              <td>{ticket.booked_seats}</td>
              <td>{new Date(ticket.date_time).toLocaleString("en-GB")}</td>
              <td>{new Date(ticket.journey_date).toLocaleDateString("en-GB")}</td>
              <td>
                <button onClick={() => downloadPDF(ticket)}>Download Ticket</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default UserProfile;
