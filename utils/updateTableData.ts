import { GridCellParams } from '@mui/x-data-grid';
export const updateTableData = async (tableName: string, tableID: string, id: number, field: string, value: any) => {
  try {
    const route = `/api/records/update?table=${tableName}&pk=${tableID}&id=${id}`;
    const config = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ field: field, value: value })
    }
    const response = await fetch(route, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    } else {
      console.log(error);
    }
  }
};