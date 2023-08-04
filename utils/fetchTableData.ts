import { Dispatch, SetStateAction } from 'react'
export const fetchTableData = async (table: string, setTableData: Dispatch<SetStateAction<any[]>>) => {
  try {
    setTableData(await (await fetch(`/api/records/read?table=${table}`)).json());
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};