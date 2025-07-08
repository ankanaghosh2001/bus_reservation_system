import React, { useState } from "react";

const SeatBox = ({ seatNumber, id, onToggle, isBooked, isDisabled }) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleClick = () => {
    if (isBooked || isDisabled) return;
    const newSelection = !isChecked;
    setIsChecked(newSelection);
    onToggle(newSelection);
  };

  const seatClass = `${isDisabled ? 'seat disabled' : isBooked ? "seat booked" : isChecked ? "seat checked" : "seat available"} `;

  return (
    <div
      className={`${seatClass}`}
      id={id}
      data-number={seatNumber}
      onClick={handleClick}
    >
      <h4>{seatNumber}</h4>
    </div>
  );
};

export default SeatBox;
