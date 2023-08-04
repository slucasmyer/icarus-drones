import { Dispatch, SetStateAction } from 'react';
import { DataGrid, GridColDef, GridCellParams, GridToolbar, GridRowId } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { columnDefinitions } from '@/utils/columnDefinitions';
//import { updateTableData } from '@/utils/updateTableData';

type DataRow = {
  id: number;
  [key: string]: any;
}

type DataFrameProps = {
  tableName: string;
  rows: DataRow[];
  setRows: Dispatch<SetStateAction<DataRow[]>>;
}



export default function DataFrame ({ tableName, rows, setRows } : DataFrameProps) {

  const tableID = tableName == `EmployeesProjects` ? `employeeprojectID` : `${tableName.slice(0, -1).toLowerCase()}ID`;
  
  const postChange = async (params: GridCellParams, event: any) => {
    try {
      const value = event.target.value
      const valueType = params.colDef.type
      const { id, field } = params;
      const route = `/api/records/update?table=${tableName}&pk=${tableID}&id=${id}`;
      const config = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ field: field, value: value, valueType: valueType })
      }
      const response = await fetch(route, config);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        alert(`Updated ${field} to ${value}`);
      }
  
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        console.log(error);
      }
    }
  };
  


const deleteRow = async (id: GridRowId) => {
  try {
    const route = `/api/records/delete?table=${tableName}&pk=${tableID}&id=${id}`;
    const config = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }
    const response = await fetch(route, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const newRows = rows.filter((row) => row[tableID] !== id);
      setRows(newRows);
      alert(`Deleted row ${id}`);
    }

  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    } else {
      console.log(error);
    }
  }
}



const deleteColumn: GridColDef = {
  field: 'delete',
  headerName: '',
  sortable: false,
  filterable: false,
  width: 100,
  renderCell: (params: GridCellParams) => {
    return <button onClick={() => deleteRow(params.id)}><DeleteOutlineIcon/></button>;
  },
}
  
  const combinedColumns = [...columnDefinitions[tableName], deleteColumn];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
          style={{color:'white'}}
          autoHeight={true}
          rows={rows}
          columns={combinedColumns}
          getRowId={(row) => row[tableID]}
          slots={{
            toolbar: GridToolbar,
          }}
          pageSizeOptions={[10]}
          checkboxSelection
          onRowSelectionModelChange={(e: any) => console.log(e)}
          disableRowSelectionOnClick
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false
              },
            },
          }}
          onCellEditStop={postChange}
          
        />
    </div>
  )
};
