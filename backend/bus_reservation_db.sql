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
