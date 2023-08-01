import React from 'react';
import { DataGrid, GridColDef, GridCellParams, GridRowsProp, GridToolbar, MuiEvent } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

type DataRow = {
  id: number;
  [key: string]: any;
}

type DataFrameProps = {
  tableName: string;
  rows: DataRow[];
  setRows: React.Dispatch<React.SetStateAction<DataRow[]>>;
  columns: GridColDef[];
}




export default function DataFrame ({ tableName, rows, setRows, columns } : DataFrameProps) {

  const postChange = (params: GridCellParams, event: MuiEvent) => {
    fetch(`/api/records/update?table=${tableName}&id=${params.id}`, {
      method: 'POST',
      body: JSON.stringify({
        field: params.field,
        value: params.value,
      }),
    }).catch((error) => {
      alert(error.message)
    });
  }

const deleteRow = async (id: number) => {
  // logic to delete the row from your database
  await fetch(`/api/deleteRow/${id}`, {
    method: 'DELETE',
  });
}

const actionColumns: GridColDef[] = [
  {
    field: 'delete',
    headerName: '',
    sortable: false,
    filterable: false,
    width: 100,
    renderCell: (params: GridCellParams) => {
      return <button onClick={() => deleteRow(params.row.id)}><DeleteOutlineIcon/></button>;
    },
  },
];
  const combinedColumns = [...columns, ...actionColumns];
  
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
          style={{color:'white'}}
          autoHeight={true}
          rows={rows}
          columns={combinedColumns}
          getRowId={(row) => row[`${tableName.slice(0, -1).toLowerCase()}ID`]}
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
          onCellKeyDown={postChange}
        />
    </div>
  )
};
