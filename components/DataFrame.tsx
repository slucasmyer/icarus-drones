import { useState, Dispatch, SetStateAction } from 'react';
import { DataGrid, GridColDef, GridCellParams, GridToolbar, GridRowId } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { columnDefinitions } from '@/utils/columnDefinitions';
import { Modal } from './modal';

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
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');
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
      const body =  await response.json();
      if (!response.ok) {
        throw new Error(`${body.error}`);
      } else {
        setModalContent(`${body.message}`);
        setModalTitle('Success!');
        setOpen(true);
      }
  
    } catch (error) {
      if (error instanceof Error) {
        setModalContent(`${error.message}`);
        setModalTitle('Something went wrong');
        setOpen(true);
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
    const body =  await response.json();
    if (!response.ok) {
      throw new Error(`${body.error}`);
    } else {
      setRows(rows.filter((row) => row[tableID] !== id));
      setModalContent(`${body.message}`);
      setModalTitle('Success!');
      setOpen(true);
    }

  } catch (error) {
    if (error instanceof Error) {
      setModalContent(`${error.message}`);
      setModalTitle('Something went wrong');
      setOpen(true);
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
        <Modal show={open} onClose={() => setOpen(false)} title={modalTitle} body={modalContent} />
    </div>
  )
};
