--
-- Table structure for table `schedulerlogger`
--

CREATE TABLE `schedulerlogger` (
  `id` int(11) NOT NULL,
  `jobId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `errorType` varchar(255) NOT NULL,
  `errorMessage` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=I