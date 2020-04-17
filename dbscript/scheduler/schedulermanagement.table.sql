--
-- Table structure for table `schedulermanagement`
--

CREATE TABLE `schedulermanagement` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `description` varchar(256) NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  `cronTimeInMs` int(100) DEFAULT NULL,
  `cronPattern` varchar(255) NOT NULL,
  `jobType` varchar(255) NOT NULL,
  `jobState` varchar(255) NOT NULL,
  `createdTS` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedTS` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;