-- Group 33 Icarus Drones
-- Sullivan Myer
-- Kevin Nguyen

-- Customers table
-- Variables
SET @customerName = 'PlaceholderName'; -- Arbitrary customer name, will be set client-side
SET @customerEmail = 'PlaceholderEmail'; -- Arbitrary customer email, will be set client-side

-- Insert
INSERT INTO `Customers` (`name`, `email`)
VALUES (@customerName, @customerEmail);

-- Select
SELECT * FROM `Customers`
WHERE `name` = @customerName AND `email` = @customerEmail;

-- Update
UPDATE `Customers`
SET `name` = @customerName, `email` = @customerEmail
WHERE `name` = @customerName;

-- Delete
DELETE FROM `Customers`
WHERE `name` = @customerName AND `email` = @customerEmail;


-- Projects table
-- Variables
SET @projectName = 'PlaceholderProject'; -- Arbitrary project name, will be set client-side
SET @estimateRelease = '2000-01-01'; -- Arbitrary date, will be set client-side
SET @budget = 10000; -- Arbitrary budget, will be set client-side
SET @customerID = 1;  -- Arbitrary customer ID, will be set client-side

-- Insert
INSERT INTO `Projects` (`customerID`, `name`, `estimate_release`, `budget`)
VALUES (@customerID, @projectName, @estimateRelease, @budget);

-- Select
SELECT * FROM `Projects`
WHERE `name` = @projectName AND `estimate_release` = @estimateRelease AND `budget` = @budget;

-- Update
UPDATE `Projects`
SET `name` = @projectName, `estimate_release` = @estimateRelease, `budget` = @budget
WHERE `name` = @projectName;

-- Delete
DELETE FROM `Projects`
WHERE `name` = @projectName AND `estimate_release` = @estimateRelease AND `budget` = @budget;


-- Employees table
-- Variables
SET @employeeName = 'PlaceholderEmployee'; -- Arbitrary employee name, will be set client-side
SET @employeeEmail = 'PlaceholderEmployeeEmail'; -- Arbitrary employee email, will be set client-side
SET @jobTitle = 'PlaceholderJobTitle'; -- Arbitrary job title, will be set client-side
SET @birthDate = '2000-01-01'; -- Arbitrary birth date, will be set client-side

-- Insert
INSERT INTO `Employees` (`name`, `email`, `job_title`, `birthdate`)
VALUES (@employeeName, @employeeEmail, @jobTitle, @birthDate);

-- Select
SELECT * FROM `Employees`
WHERE `name` = @employeeName AND `email` = @employeeEmail;

-- Update
UPDATE `Employees`
SET `name` = @employeeName, `email` = @employeeEmail, `job_title` = @jobTitle, `birthdate` = @birthDate
WHERE `name` = @employeeName;

-- Delete
DELETE FROM `Employees`
WHERE `name` = @employeeName AND `email` = @employeeEmail;

-- EmployeesProjects table
-- Variables
SET @employeeID = 'PlaceholderEmployeeID'; -- Arbitrary employeeID, will be set client-side
SET @projectID = 'PlaceholderProjectID'; -- Arbitrary projectID, will be set client-side
SET @assignment_date = '2000-01-01'; -- Arbitrary assignment date, will be set client-side
SET @role = 'PlaceholderRole'; -- Arbitrary role, will be set client-side
SET @hours = 10; -- Arbitrary hours, will be set client-side

-- Insert
INSERT INTO `EmployeesProjects` (`employeeID`, `projectID`, `assignment_date`, `role`, `hours`)
VALUES (@employeeID, @projectID, @assignment_date, @role, @hours);

-- Select
SELECT * FROM `EmployeesProjects`
WHERE `employeeID` = @employeeID AND `projectID` = @projectID;

-- Update
UPDATE `EmployeesProjects`
SET `employeeID` = @employeeID, `projectID` = @projectID
WHERE `employeeID` = @employeeID AND `projectID` = @projectID;

-- Delete
DELETE FROM `EmployeesProjects`
WHERE `employeeID` = @employeeID AND `projectID` = @projectID;

-- Features table
-- Variables
SET @featureName = 'PlaceholderFeature'; -- Arbitrary feature name, will be set client-side
SET @purchasePrice = 100.00; -- Arbitrary purchase price, will be set client-side
SET @qtyInSupply = 10; -- Arbitrary quantity in supply, will be set client-side
SET @projectID = 1;  -- Assuming a project with ID 1 exists
SET @supplierID = 1;  -- Assuming a supplier with ID 1 exists

-- Insert
INSERT INTO `Features` (`projectID`, `supplierID`, `name`, `purchase_price`, `qty_in_supply`)
VALUES (@projectID, @supplierID, @featureName, @purchasePrice, @qtyInSupply);

-- Select
SELECT * FROM `Features`
WHERE `name` = @featureName AND `purchase_price` = @purchasePrice AND `qty_in_supply` = @qtyInSupply;

-- Update
UPDATE `Features`
SET `name` = @featureName, `purchase_price` = @purchasePrice, `qty_in_supply` = @qtyInSupply
WHERE `name` = @featureName;

-- Delete
DELETE FROM `Features`
WHERE `name` = @featureName AND `purchase_price` = @purchasePrice AND `qty_in_supply` = @qtyInSupply;


-- Suppliers table
-- Variables
SET @supplierName = 'PlaceholderSupplier'; -- Arbitrary supplier name, will be set client-side
SET @supplierEmail = 'PlaceholderSupplierEmail'; -- Arbitrary supplier email, will be set client-side
SET @location = 'PlaceholderLocation'; -- Arbitrary location, will be set client-side
SET @phone = '1234567890'; -- Arbitrary phone number, will be set client-side

-- Insert
INSERT INTO `Suppliers` (`name`, `email`, `location`, `phone`)
VALUES (@supplierName, @supplierEmail, @location, @phone);

-- Select
SELECT * FROM `Suppliers`
WHERE `name` = @supplierName AND `email` = @supplierEmail;

-- Update
UPDATE `Suppliers`
SET `name` = @supplierName, `email` = @supplierEmail, `location` = @location, `phone` = @phone
WHERE `name` = @supplierName;

-- Delete
DELETE FROM `Suppliers`
WHERE `name` = @supplierName AND `email` = @supplierEmail;
