export const foreignKeyChecks = {
  'EmployeesProjects': [
    { field: 'employeeID', query: 'SELECT 1 FROM Employees WHERE employeeID = ?' },
    { field: 'projectID', query: 'SELECT 1 FROM Projects WHERE projectID = ?' },
  ],
  'Projects': [
    { field: 'customerID', query: 'SELECT 1 FROM Customers WHERE customerID = ?' },
  ],
  'Features': [
    { field: 'projectID', query: 'SELECT 1 FROM Projects WHERE projectID = ?' },
    { field: 'supplierID', query: 'SELECT 1 FROM Suppliers WHERE supplierID = ?' },
  ],
};