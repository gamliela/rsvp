CREATE DATABASE  IF NOT EXISTS `rsvp` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `rsvp`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: rsvp
-- ------------------------------------------------------
-- Server version	5.7.17-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `events` (
  `event_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `event_date` date DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `access_code` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'האירוע של מושיקו','2016-11-24','אולם השושן חיפה','1234');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guests`
--

DROP TABLE IF EXISTS `guests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `guests` (
  `guest_id` int(11) NOT NULL AUTO_INCREMENT,
  `event_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `table_number` varchar(10) NOT NULL,
  `num_guests` int(11) NOT NULL DEFAULT '1',
  `new_table_number` varchar(10) DEFAULT NULL,
  `new_num_guests` int(11) DEFAULT NULL,
  `new_arrival_time` time DEFAULT NULL,
  `new_handled_by` varchar(45) DEFAULT NULL,
  `comments` text,
  PRIMARY KEY (`guest_id`),
  KEY `guests_event_id_idx` (`event_id`),
  CONSTRAINT `guests_event_id` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guests`
--

LOCK TABLES `guests` WRITE;
/*!40000 ALTER TABLE `guests` DISABLE KEYS */;
INSERT INTO `guests` VALUES (13,1,'יוסי','1',1,'1',1,'23:34:00','משה',NULL),(14,1,'דוד','1',1,'1',1,NULL,NULL,NULL),(15,1,'נעמה','1',2,'1',2,NULL,NULL,NULL),(16,1,'רונן','1',1,'1',1,'23:34:00','משה',NULL),(17,1,'יוגב','2',2,NULL,NULL,NULL,NULL,NULL),(18,1,'מיכל','2',2,NULL,NULL,NULL,NULL,NULL),(19,1,'מקסים','2',2,NULL,NULL,NULL,NULL,NULL),(20,1,'חלי','3',1,NULL,NULL,NULL,NULL,NULL),(21,1,'רוחמה','3',2,NULL,NULL,NULL,NULL,NULL),(22,1,'אליאב','3',1,NULL,NULL,NULL,NULL,NULL),(23,1,'דוד','4',1,'4',1,'23:34:00','משה',NULL),(24,1,'חדוה','4',2,NULL,NULL,NULL,NULL,NULL),(25,1,'שושנה','4',1,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `guests` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-04-05 12:30:00
