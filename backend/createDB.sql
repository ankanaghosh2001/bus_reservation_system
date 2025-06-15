CREATE DATABASE bus_reservation;
USE bus_reservation;

CREATE TABLE users (
    username VARCHAR(25) NOT NULL,
    phoneNo INT(10) UNIQUE NOT NULL,
    password VARCHAR(15) NOT NULL
);

-- CREATE TABLE otp_codes (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     user_id INT NOT NULL,
--     otp_code VARCHAR(6) NOT NULL,
--     expires_at TIMESTAMP NOT NULL,
--     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
-- );
