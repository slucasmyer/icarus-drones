import { GridValueGetterParams } from '@mui/x-data-grid'
interface ColumnDefinitions {
  [key: string]: any[]
}




export const columnDefinitions: ColumnDefinitions = {
  Employees:  [
    { field: 'employeeID', headerName: 'Employee ID', width: 90, type: 'number' },
    { field: 'name', headerName: 'Name', width: 150, type: 'string', editable: true },
    { field: 'email', headerName: 'Email', width: 150, type: 'string', editable: true },
    { field: 'job_title', headerName: 'Job Title', width: 150, type: 'string', editable: true },
    { field: 'birthdate', headerName: 'Birthdate', width: 150, type: 'date', valueGetter: (params: GridValueGetterParams) => new Date(params.value), editable: true },
  ],
  EmployeesProjects: [
    { field: 'employeeprojectID', headerName: 'Assignment ID', width: 150, type: 'number' },
    { field: 'employeeID', headerName: 'Employee ID', width: 150, editable: true, type: 'number' },
    { field: 'projectID', headerName: 'Project ID', width: 150, editable: true, type: 'number' },
    { field: 'assignment_date', headerName: 'Assignment Date', width: 150, type: 'date', valueGetter: (params: GridValueGetterParams) => new Date(params.value), editable: true },
    { field: 'role', headerName: 'Role', width: 150, editable: true, type: 'string' },
    { field: 'hours', headerName: 'Hours', width: 150, editable: true, type: 'number' }

  ],
  Projects: [
    { field: 'projectID', headerName: 'Project ID', width: 90, type: 'number' },
    { field: 'customerID', headerName: 'Customer ID', width: 90, type: 'number', editable: true },
    { field: 'name', headerName: 'Name', width: 150, type: 'string', editable: true },
    { field: 'estimate_release', headerName: 'Release Date', width: 150, type: 'date', valueGetter: (params: GridValueGetterParams) => new Date(params.value), editable: true },
    { field: 'budget', headerName: 'Budget', width: 150, type: 'number', editable: true },
  ],
  Customers: [
    { field: 'customerID', headerName: 'Customer ID', width: 90, type: 'number' },
    { field: 'name', headerName: 'Name', width: 150, editable: true, type: 'string' },
    { field: 'email', headerName: 'Email', width: 150, editable: true, type: 'string' },
  ],
  Features: [
    { field: 'featureID', headerName: 'Feature ID', width: 90, type: 'number' },
    { field: 'projectID', headerName: 'Project ID', width: 90, type: 'number', editable: true },
    { field: 'supplierID', headerName: 'Supplier ID', width: 90, type: 'number', editable: true },
    { field: 'name', headerName: 'Name', width: 150, editable: true, type: 'string' },
    { field: 'purchase_price', headerName: 'Purchase Price', width: 150, editable: true, type: 'number' },
    { field: 'qty_in_supply', headerName: 'Quantity in Supply', width: 150, editable: true, type: 'number' },
  ],
  Suppliers: [
    { field: 'supplierID', headerName: 'Supplier ID', width: 90, type: 'number' },
    { field: 'name', headerName: 'Name', width: 150, type: 'string', editable: true },
    { field: 'email', headerName: 'Email', width: 150, type: 'string', editable: true },
    { field: 'location', headerName: 'Location', width: 150, type: 'string', editable: true },
    { field: 'phone', headerName: 'Phone', width: 150, type: 'string', editable: true },
  ]
};