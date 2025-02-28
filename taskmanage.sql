-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:4000
-- Generation Time: Feb 28, 2025 at 10:50 AM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `taskmanage`
--

-- --------------------------------------------------------

--
-- Table structure for table `tasking`
--

CREATE TABLE `tasking` (
  `id` int(11) NOT NULL,
  `title` varchar(10000) NOT NULL,
  `description` varchar(10000) DEFAULT NULL,
  `status` enum('Pending','In Progess','Completed') NOT NULL DEFAULT 'Pending',
  `due_date` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tasking`
--

INSERT INTO `tasking` (`id`, `title`, `description`, `status`, `due_date`, `created_at`) VALUES
(1, 'ปั่น Fullstack', 'รีบๆทำให้เสร็จ', 'Pending', '2025-02-28 17:38:53', '2025-02-28 10:39:22'),
(2, 'ปั่น SA', NULL, 'In Progess', '2025-02-01 17:50:05', '2025-02-28 10:50:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tasking`
--
ALTER TABLE `tasking`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tasking`
--
ALTER TABLE `tasking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
