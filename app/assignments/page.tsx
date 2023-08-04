"use client";
import { useState, useEffect } from 'react';
import { TextField, Stack, Container } from '@mui/material';
import CRUDSelect from '@/components/CRUDSelect';
import Button from '@/components/Button';
import DataFrame from '@/components/DataFrame';
import { fetchTableData } from '@/utils/fetchTableData';

export default function Assignments(props: any) {
  const [queryType, setQueryType] = useState<string | null>(null);
  const [employeeID, setEmployeeID] = useState<string | null>(null);
  const [projectID, setProjectID] = useState<string | null>(null);
  const [employeesProjects, setEmployeesProjects] = useState<any[]>([]);
  const tableName = 'EmployeesProjects';
  
  const onQueryChange = async (e: any) => {
    const { id, value } = e.currentTarget || e.target;
    switch (id) {
      case 'query-type-select':
        setQueryType(value);
        break;
      default:
        break;
    }
  };

  const onChange = async (e: any) => {
    const { id, value } = e.currentTarget || e.target;
    switch (id) {
      case 'employee-id-input':
        setEmployeeID(value);
        break;
      case 'project-id-input':
        setProjectID(value);
        break;
      default:
        break;
    }
  };

  const onSubmit = async (e: any) => {
    console.log(queryType, employeeID, projectID)
  };

  useEffect(() => {
    fetchTableData(tableName, setEmployeesProjects);
  }, []);

  return (
    <Container maxWidth={`lg`}>
      <Stack direction={'column'} spacing={3} className={'page-content'}>
        <h1 className={`self-center`}>Employee Assignments</h1>
        <DataFrame tableName={tableName} rows={employeesProjects} setRows={setEmployeesProjects} />
        <CRUDSelect onChange={onQueryChange} />
        <TextField className={"self-center"} sx={{width:300}} id="employee-id-input" label="Employee ID" variant="outlined" type={`number`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={{width:300}} id="project-id-input" label="Project ID" variant="outlined" type={`number`} color={`secondary`} onChange={onChange} />
        <Button className={`btn-blue w-fit self-center`} onClick={onSubmit}>Submit</Button>
      </Stack>
    </Container>
  )
}