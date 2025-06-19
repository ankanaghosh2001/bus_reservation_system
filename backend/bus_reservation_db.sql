--
-- Database: `bus_reservation`
--

-- --------------------------------------------------------

--
-- Table structure for table `booked_seats`
--

CREATE TABLE `booked_seats` (
  `SID` int(11) NOT NULL,
  `trip_id` int(11) DEFAULT NULL,
  `userID` varchar(10) NOT NULL,
  `seat_number` int(11) DEFAULT NULL,
  `booked_at` timestamp NOT NULL DEFAULT current_timestamp()
);

------------------------------------------------------------

--
-- Table structure for table `trip_details`
--

CREATE TABLE `trip_details` (
  `RID` int(4) NOT NULL,
  `source` varchar(20) NOT NULL,
  `destination` varchar(20) NOT NULL,
  `fare` int(3) NOT NULL
);


-- --------------------------------------------------------

--
-- Table structure for table `trip_instances`
--

CREATE TABLE `trip_instances` (
  `id` int(11) NOT NULL,
  `RID` int(11) DEFAULT NULL,
  `tDate` date DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(25) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `password` varchar(255) NOT NULL
);

--
-- Indexes for table `booked_seats`
--
ALTER TABLE `booked_seats`
  ADD PRIMARY KEY (`SID`),
  ADD KEY `trip_id` (`trip_id`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `trip_details`
--
ALTER TABLE `trip_details`
  ADD PRIMARY KEY (`RID`);

--
-- Indexes for table `trip_instances`
--
ALTER TABLE `trip_instances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `RID` (`RID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`phone`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booked_seats`
--
ALTER TABLE `booked_seats`
  MODIFY `SID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `trip_details`
--
ALTER TABLE `trip_details`
  MODIFY `RID` int(4) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `trip_instances`
--
ALTER TABLE `trip_instances`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booked_seats`
--
ALTER TABLE `booked_seats`
  ADD CONSTRAINT `booked_seats_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`phone`) ON DELETE CASCADE;

--
-- Constraints for table `trip_instances`
--
ALTER TABLE `trip_instances`
  ADD CONSTRAINT `trip_instances_ibfk_1` FOREIGN KEY (`RID`) REFERENCES `trip_details` (`RID`);
COMMIT;


-- Data insertion into `trip_details` schema 

INSERT INTO trip_details (RID, source, destination, fare) VALUES
(1, 'Kolkata', 'Digha', 250),
(2, 'Kolkata', 'Siliguri', 600),
(3, 'Kolkata', 'Darjeeling', 650),
(4, 'Kolkata', 'Murshidabad', 300),
(5, 'Kolkata', 'Asansol', 250),
(6, 'Kolkata', 'Bankura', 350),
(7, 'Kolkata', 'Haldia', 180),
(8, 'Kolkata', 'Malda', 400),
(9, 'Kolkata', 'Berhampore', 350),

(10, 'Digha', 'Siliguri', 700),
(11, 'Digha', 'Darjeeling', 720),
(12, 'Digha', 'Murshidabad', 420),
(13, 'Digha', 'Asansol', 380),
(14, 'Digha', 'Bankura', 400),
(15, 'Digha', 'Haldia', 150),
(16, 'Digha', 'Malda', 470),
(17, 'Digha', 'Berhampore', 420),

(18, 'Siliguri', 'Darjeeling', 90),
(19, 'Siliguri', 'Murshidabad', 480),
(20, 'Siliguri', 'Asansol', 500),
(21, 'Siliguri', 'Bankura', 550),
(22, 'Siliguri', 'Haldia', 620),
(23, 'Siliguri', 'Malda', 230),
(24, 'Siliguri', 'Berhampore', 370),

(25, 'Darjeeling', 'Murshidabad', 500),
(26, 'Darjeeling', 'Asansol', 520),
(27, 'Darjeeling', 'Bankura', 560),
(28, 'Darjeeling', 'Haldia', 640),
(29, 'Darjeeling', 'Malda', 250),
(30, 'Darjeeling', 'Berhampore', 390),

(31, 'Murshidabad', 'Asansol', 220),
(32, 'Murshidabad', 'Bankura', 280),
(33, 'Murshidabad', 'Haldia', 300),
(34, 'Murshidabad', 'Malda', 150),
(35, 'Murshidabad', 'Berhampore', 50),

(36, 'Asansol', 'Bankura', 120),
(37, 'Asansol', 'Haldia', 260),
(38, 'Asansol', 'Malda', 330),
(39, 'Asansol', 'Berhampore', 290),

(40, 'Bankura', 'Haldia', 280),
(41, 'Bankura', 'Malda', 320),
(42, 'Bankura', 'Berhampore', 300),

(43, 'Haldia', 'Malda', 390),
(44, 'Haldia', 'Berhampore', 370),

(45, 'Malda', 'Berhampore', 120);
(46, 'Digha', 'Kolkata', 250);
(47, 'Berhampore', 'Siliguri', 370);