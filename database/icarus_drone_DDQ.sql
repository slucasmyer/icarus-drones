-- Group 33 Icarus Drones
-- Sullivan Myer
-- Kevin Nguyen

SET foreign_key_checks = 0;
SET AUTOCOMMIT = 0;

-- Provides the details of the Customers table that have purchased or requested a Drone Project
-- Primary Key: customerID
-- Foreign Key: N/A

DROP TABLE IF EXISTS `Customers`;
CREATE TABLE `Customers` (
  `customerID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`customerID`)
);

-- Sample data to insert into the Customers Table

INSERT INTO `Customers` (
  `name`,
  `email`
)
VALUES
(
  "Seanna Townsend",
  "seannaT3@gmail.com"
),
(
  "Jane Riordan",
  "jane.riordan@gmail.com"
),
(
  "DoD",
  "DoD@us.gov"
);

-- Provides the details of the Projects table that is the overarching key object that other tables are connected to.
-- Primary Key: projectID
-- Foreign Key: customerID

DROP TABLE IF EXISTS `Projects`;
CREATE TABLE `Projects` (
  `projectID` int(11) NOT NULL AUTO_INCREMENT,
  `customerID` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `estimate_release` DATE NOT NULL,
  `budget` int NOT NULL,
  PRIMARY KEY (`projectID`),
  FOREIGN KEY (`customerID`) REFERENCES Customers(`customerID`)
);

-- Sample data to insert into the Projects Table

INSERT INTO `Projects` (
  `customerID`,
  `name`,
  `estimate_release`,
  `budget`
)
VALUES
(
  1,
  "Hyperion Nexus",
  '2017-02-10',
  17905
),
(
  2,
  "Sam's Flying Machine",
  '2019-10-03',
  22133
),
(
  3,
  "Hercules' Base",
  '2020-01-15',
  19024
);

-- Provides the details of the Employees table to show who is working on which Project.
-- Primary Key: employeeID
-- Foreign Key: N/A

DROP TABLE IF EXISTS `Employees`;
CREATE TABLE `Employees` (
  `employeeID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `job_title` varchar(255) NOT NULL,
  `birthdate` DATE NOT NULL,
  PRIMARY KEY (`employeeID`)
);

-- Sample data to insert into the Employees Table

INSERT INTO `Employees` (
  `name`,
  `email`,
  `job_title`,
  `birthdate`
)
VALUES
(
  "Sherry Artesia",
  "sherry.artesia@icarus.com",
  "Stress Engineer",
  '2001-04-12'
),
(
  "Kenneth McDowell",
  "kenneth.mcdowell@icarus.com",
  "Mechanical Engineer",
  '1971-08-26'
),
(
  "Harry Shielding",
  "harry.shielding@icarus.com",
  "Senior System Engineer",
  '1975-11-17'
);

-- Interaction/Intersection table that connects Employees and Projects table together.
-- Primary Key: N/A
-- Foreign Key: employeeID, projectID

DROP TABLE IF EXISTS `EmployeesProjects`;

CREATE TABLE `EmployeesProjects` (
  `employeeprojectID` int(11) NOT NULL AUTO_INCREMENT,
  `employeeID` int(11) NOT NULL,
  `projectID` int(11) NOT NULL,
  `assignment_date` DATE NOT NULL,
  `role` varchar(255),
  `hours` DECIMAL(5,2),
  PRIMARY KEY (`employeeprojectID`),
  UNIQUE KEY `EmployeeProjectCombination` (`employeeID`, `projectID`),
  FOREIGN KEY (`employeeID`) REFERENCES Employees(`employeeID`),
  FOREIGN KEY (`projectID`) REFERENCES Projects(`projectID`)
);

--- Sample data to insert into the EmployeesProjects Table

INSERT INTO `EmployeesProjects` (
  `employeeID`,
  `projectID`,
  `assignment_date`,
  `role`,
  `hours`
)
VALUES
(
  1,
  1,
  '2023-01-01',
  'Project Lead',
  35.5
),
(
  2,
  1,
  '2023-01-01',
  'Engineer',
  40.0
),
(
  3,
  2,
  '2023-02-01',
  'System Architect',
  37.5
);

-- Provides the details of the Features table that keeps track of each additional features or Add-Ons that each customer would like.
-- Primary Key: featureID
-- Foreign Key: projectID, supplierID

DROP TABLE IF EXISTS `Features`;
CREATE TABLE `Features` (
  `featureID` int(11) NOT NULL AUTO_INCREMENT,
  `projectID` int NOT NULL,
  `supplierID` int,
  `name` varchar(255) NOT NULL,
  `purchase_price` decimal(12,2) NOT NULL,
  `qty_in_supply` int,
  PRIMARY KEY (`featureID`),
  FOREIGN KEY (`projectID`) REFERENCES Projects(`projectID`),
  FOREIGN KEY (`supplierID`) REFERENCES Suppliers(`supplierID`) ON UPDATE CASCADE
);

-- Sample data to insert into the Features Table

INSERT INTO `Features` (
  `projectID`,
  `supplierID`,
  `name`,
  `purchase_price`,
  `qty_in_supply`
)
VALUES
(
  1,
  1,
  "Collier Aeronautics",
  12465.72,
  2
),
(
  2,
  2,
  "Megrine Electronics",
  789.12,
  16
),
(
  3,
  3,
  "Sensordyne",
  45.87,
  98
);

-- Provides the details of the Suppliers table that is providing the features to incorporate into each Projects.
-- Primary Key: supplierID
-- Foreign Key: N/A

DROP TABLE IF EXISTS `Suppliers`;
CREATE TABLE `Suppliers` (
  `supplierID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `phone` varchar(12) NOT NULL,
  PRIMARY KEY (`supplierID`)
);

-- Sample data to insert into the Suppliers Table

INSERT INTO `Suppliers` (
  `name`,
  `email`,
  `location`,
  `phone`
)
VALUES
(
  "Honeyjar",
  "honeyjar.support@honeyjar.com",
  "Phoenix, Arizona",
  '524-265-2009'
),
(
  "Skygate",
  "skygate.products@skygate.com",
  "Everett, Washington",
  '425-556-9900'
),
(
  "Eye Cam",
  "eyecam.support@eyecam.com", 
  "Tacoma, Washington",
  '306-211-5617'
);


SET foreign_key_checks = 1;
COMMIT;