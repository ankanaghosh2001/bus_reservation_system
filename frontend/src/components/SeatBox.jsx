import React, {useState} from 'react'

const SeatBox = ({seatNumber, id, onToggle, isBooked, isDisabled}) => {

  const [isChecked, setIsChecked] = useState(false)
  const handleClick = () => {
    if (isBooked) return;
    const newSelection = !isChecked
    setIsChecked(newSelection)
    onToggle(newSelection)
  }

  const seatClass = `${isBooked ? "seat booked" : isChecked ? "seat checked" : "seat available"} ${isDisabled ? 'disabled' : ''}`;

  return (
    <div className={`${seatClass}`} id={id} data-number={seatNumber} onClick={handleClick}>
      <h4>{seatNumber}</h4>
    </div>
  )
}

export default SeatBox
