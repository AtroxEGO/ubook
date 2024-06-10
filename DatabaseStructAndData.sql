CREATE DATABASE  IF NOT EXISTS `ubook` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ubook`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: ubook
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `service_id` int NOT NULL,
  `timestamp` varchar(45) NOT NULL,
  `accepted` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `serviceID_timestamp_UNIQUE` (`service_id`,`timestamp`),
  CONSTRAINT `bookings_services_key` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,1,4,'2023-10-31T08:00:00+01:00',0),(2,1,4,'2023-10-31T14:15:00+01:00',0),(4,1,11,'2023-10-31T09:15:00+01:00',0);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `business_verification_codes`
--

DROP TABLE IF EXISTS `business_verification_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `business_verification_codes` (
  `owner_id` int NOT NULL,
  `verification_code` int NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`owner_id`),
  UNIQUE KEY `owner_id_UNIQUE` (`owner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `business_verification_codes`
--

LOCK TABLES `business_verification_codes` WRITE;
/*!40000 ALTER TABLE `business_verification_codes` DISABLE KEYS */;
INSERT INTO `business_verification_codes` VALUES (2,181068,'2023-10-25 18:50:42'),(3,361322,'2023-10-25 18:51:25'),(4,799821,'2023-10-25 18:53:34'),(5,291498,'2023-10-25 18:59:36'),(6,307814,'2023-10-28 22:54:28'),(7,539520,'2023-10-28 22:56:09'),(8,983843,'2023-10-28 22:56:48'),(9,174347,'2023-10-28 22:57:10'),(10,826690,'2023-10-28 22:58:15'),(11,837452,'2023-10-28 22:58:48'),(12,392379,'2023-10-28 23:04:33');
/*!40000 ALTER TABLE `business_verification_codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `businesses`
--

DROP TABLE IF EXISTS `businesses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `businesses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `password` varchar(300) NOT NULL,
  `name` varchar(45) NOT NULL,
  `avatar_url` varchar(200) DEFAULT NULL,
  `address` varchar(45) NOT NULL,
  `allows_marketing` tinyint NOT NULL,
  `verified` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `businesses`
--

LOCK TABLES `businesses` WRITE;
/*!40000 ALTER TABLE `businesses` DISABLE KEYS */;
INSERT INTO `businesses` VALUES (1,'user@example.com','$2b$15$V0NtIup9mhwQ/yoIc7GT5uhzUk8kpuyWa8.TxpVTm5MsHFx6EccvG','Test Business','','Krk',1,1);
/*!40000 ALTER TABLE `businesses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Health and Medical Services'),(2,'Beauty and Personal Care'),(3,'Wellness and Fitness'),(4,'Legal and Financial Services'),(5,'Education and Tutoring'),(6,'Spa and Relaxation'),(7,'Automotive Services'),(8,'Home and Maintenance Services'),(9,'Pet Services'),(10,'Technology and IT Services'),(11,'Fitness and Sports'),(12,'Event Planning and Photography'),(13,'Counseling and Therapy'),(14,'Travel and Tours'),(15,'Dining and Restaurant Reservations'),(16,'Retail and Shopping'),(17,'Government and Legal Services'),(18,'Special Events and Occasions'),(19,'Miscellaneous Appointments');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `service_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `favorite_unique_key` (`user_id`,`service_id`),
  KEY `favorites_service_key_idx` (`service_id`),
  KEY `favorites_user_key_idx` (`user_id`) /*!80000 INVISIBLE */,
  CONSTRAINT `favorites_service_key` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE,
  CONSTRAINT `favorites_user_key` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
INSERT INTO `favorites` VALUES (81,1,4);
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `service_id` int NOT NULL,
  `user_id` int NOT NULL,
  `review` int NOT NULL,
  PRIMARY KEY (`service_id`),
  KEY `reviews_users_key_idx` (`user_id`),
  CONSTRAINT `reviews_services_key` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_users_key` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (4,1,3),(5,1,5),(6,1,5),(10,1,5),(11,1,5);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `subcategory` int NOT NULL,
  `image_url` varchar(300) NOT NULL,
  `price` decimal(4,2) NOT NULL,
  `duration` int NOT NULL,
  `gap` int NOT NULL,
  `serviceHourStart` varchar(5) NOT NULL,
  `serviceHourEnd` varchar(5) NOT NULL,
  `created_by` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `services_business_key_idx` (`created_by`),
  CONSTRAINT `services_businesses_key` FOREIGN KEY (`created_by`) REFERENCES `businesses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (4,'Service Name Example','This is a sample service description.',1,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8:00','16:00',1),(5,'Service Name Example','This is a sample service description.',14,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8:00','16:00',1),(6,'Service Name Example','This is a sample service description.',13,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(8,'Service Name Example','This is a sample service description.',52,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(9,'Service Name Example','This is a sample service description.',23,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(10,'Service Name Example','This is a sample service description.',1,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(11,'Service Name Example','This is a sample service description.',2,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(12,'Service Name Example','This is a sample service description.',3,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(13,'Service Name Example','This is a sample service description.',4,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(14,'Service Name Example','This is a sample service description.',5,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(15,'Service Name Example','This is a sample service description.',6,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(16,'Service Name Example','This is a sample service description.',7,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(17,'Service Name Example','This is a sample service description.',8,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(18,'Service Name Example','This is a sample service description.',9,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(19,'Service Name Example','This is a sample service description.',10,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(20,'Service Name Example','This is a sample service description.',11,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(21,'Service Name Example','This is a sample service description.',12,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(22,'Service Name Example','This is a sample service description.',13,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(23,'Service Name Example','This is a sample service description.',14,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(24,'Service Name Example','This is a sample service description.',15,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(25,'Service Name Example','This is a sample service description.',16,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(26,'Service Name Example','This is a sample service description.',17,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(27,'Service Name Example','This is a sample service description.',18,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(28,'Service Name Example','This is a sample service description.',19,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(29,'Service Name Example','This is a sample service description.',20,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(30,'Service Name Example','This is a sample service description.',21,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(31,'Service Name Example','This is a sample service description.',22,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(32,'Service Name Example','This is a sample service description.',23,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(33,'Service Name Example','This is a sample service description.',24,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(34,'Service Name Example','This is a sample service description.',25,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(35,'Service Name Example','This is a sample service description.',26,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(36,'Service Name Example','This is a sample service description.',27,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(37,'Service Name Example','This is a sample service description.',28,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(38,'Service Name Example','This is a sample service description.',29,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(39,'Service Name Example','This is a sample service description.',30,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(40,'Service Name Example','This is a sample service description.',31,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(41,'Service Name Example','This is a sample service description.',32,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(42,'Service Name Example','This is a sample service description.',33,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(43,'Service Name Example','This is a sample service description.',34,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(44,'Service Name Example','This is a sample service description.',35,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(45,'Service Name Example','This is a sample service description.',36,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',51.00,60,15,'8','16',1),(46,'Service Name Example','This is a sample service description.',36,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',50.99,60,15,'8','16',1),(47,'Main Service','This is a sample service description for the main service on this page used to test all connections :).',1,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',50.99,60,15,'8','16',1),(48,'Main Service','This is a sample service description for the main service on this page used to test all connections :).',1,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',50.99,60,15,'8','16',1),(49,'Test123123123','Test123123123123',1,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',12.99,31,11,'00:00','06:30',1),(50,'Test123123123','Test123123123123',1,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',12.99,31,11,'00:00','01:00',1),(51,'Test123123123','Test123123123123',1,'https://firebasestorage.googleapis.com/v0/b/ubook-1695284277411.appspot.com/o/serviceImages%2Ffb9a8b7d-4181-4418-90aa-4b8e9d527c06.png?alt=media&token=5231ef17-7a18-494c-9b68-2246b0e2a466',12.99,31,11,'03:15','14:15',1);
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subcategory_name` varchar(45) NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `subcategories_category_key_idx` (`category_id`),
  CONSTRAINT `subcategories_categories_key` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategories`
--

LOCK TABLES `subcategories` WRITE;
/*!40000 ALTER TABLE `subcategories` DISABLE KEYS */;
INSERT INTO `subcategories` VALUES (1,'Doctors\' Appointments',1),(2,'Dentist Appointments',1),(3,'Therapist and Counseling Sessions',1),(4,'Chiropractor Appointments',1),(5,'Dermatologist Appointments',1),(6,'Hair Salon Appointments',2),(7,'Nail Salon Appointments',2),(8,'Spa and Massage Appointments',2),(9,'Esthetician Appointments',2),(10,'Tattoo and Piercing Appointments',2),(11,'Fitness Trainer Sessions',3),(12,'Yoga and Pilates Classes',3),(13,'Nutritionist Consultations',3),(14,'Physical Therapy Appointments',3),(15,'Acupuncture Sessions',3),(16,'Legal Consultations',4),(17,'Financial Advisor Appointments',4),(18,'Tax Consultations',4),(19,'Notary Services',4),(20,'Estate Planning Consultations',4),(21,'Academic Tutoring Sessions',5),(22,'Language Learning Classes',5),(23,'Test Prep Tutoring',5),(24,'Music or Art Lessons',5),(25,'Online Learning Support',5),(26,'Spa Packages',6),(27,'Massage Therapy',6),(28,'Facials and Skincare',6),(29,'Wellness Retreats',6),(30,'Meditation Sessions',6),(31,'Car Repair Appointments',7),(32,'Vehicle Inspection',7),(33,'Oil Change Appointments',7),(34,'Car Wash and Detailing',7),(35,'Tire Services',7),(36,'Plumbing Services',8),(37,'Electrician Appointments',8),(38,'Home Cleaning Services',8),(39,'HVAC Maintenance',8),(40,'Appliance Repair',8),(41,'Veterinary Appointments',9),(42,'Pet Grooming',9),(43,'\nDog Training Sessions',9),(44,'Pet Boarding Reservations',9),(45,'Pet Sitting Services',9),(46,'Computer Repair Services',10),(47,'IT Consultations',10),(48,'Software Development Consultations',10),(49,'Tech Support Appointments',10),(50,'Network Setup and Maintenance',10),(51,'Gym Membership Registration',11),(52,'Personal Training Sessions',11),(53,'Sports Coaching',11),(54,'Group Fitness Classes',11),(55,'Sports Facility Rentals',11),(56,'Event Planner Consultations',12),(57,'Event Photography Sessions',12),(58,'Wedding Planning Appointments',12),(59,'Event Venue Tours',12),(60,'Catering Services',12),(61,'Marriage Counseling Sessions',13),(62,'Family Therapy Appointments',13),(63,'Addiction Counseling',13),(64,'Mental Health Counseling',13),(65,'Life Coaching',13),(66,'Travel Agency Consultations',14),(67,'Tour Bookings',14),(68,'Sightseeing Tours',14),(69,'Travel Insurance Consultations',14),(70,'Cruise Bookings',14),(71,'Restaurant Table Reservations',14),(72,'Restaurant Table Reservations',15),(73,'Catering Orders',15),(74,'Private Dining Room Bookings',15),(75,'Wine Tasting Appointments',15),(76,'Cooking Classes',15),(77,'Personal Shopping Appointments',16),(78,'Tailoring and Alterations',16),(79,'Jewelry Consultations',16),(80,'Bridal Gown Fittings',16),(81,'Custom Clothing Orders',16),(82,'Psychic Readings',19),(83,'Home Energy Audits',19),(84,'Career Coaching Sessions',19),(85,'Home Appraisals',19),(86,'Virtual Consultations',19);
/*!40000 ALTER TABLE `subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_verification_codes`
--

DROP TABLE IF EXISTS `user_verification_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_verification_codes` (
  `owner_id` int NOT NULL,
  `verification_code` int NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`owner_id`),
  UNIQUE KEY `owner_id_UNIQUE` (`owner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_verification_codes`
--

LOCK TABLES `user_verification_codes` WRITE;
/*!40000 ALTER TABLE `user_verification_codes` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_verification_codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `password` varchar(300) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `avatar_url` varchar(300) DEFAULT NULL,
  `allows_marketing` tinyint NOT NULL,
  `verified` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'user@example.com','$2b$15$T6TkELftSwD78GVuk0oQFurkVmlfBeAqhbEM/qBK4VR442u6kNgHi','Paweł','Polakiewicz','',1,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-01 18:24:01
