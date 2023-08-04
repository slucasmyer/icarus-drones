"use client";
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { TextField, Stack, Container } from '@mui/material';
import CRUDSelect from '@/components/CRUDSelect';
import Button from '@/components/Button';
import DataFrame from '@/components/DataFrame';
import { fetchTableData } from '@/utils/fetchTableData';


export default function Employees(props: any) {
  const [queryType, setQueryType] = useState<string | null>(null);
  const [employeeName, setEmployeeName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [jobTitle, setJobTitle] = useState<string | null>(null);
  const [birthdate, setBirthdate] = useState<string | null>(null);
  const [employees, setEmployees] = useState<any[]>([]);
  const tableName = 'Employees';

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
      case 'employeeName-input':
        setEmployeeName(value);
        break;
      case 'email-input':
        setEmail(value);
        break;
      case 'jobTitle-input':
        setJobTitle(value);
        break;
      case 'birthdate-input':
        setBirthdate(value);
        break;
      default:
        break;
    }
  };

  const onSubmit = async (e: any) => {
    console.log(queryType, employeeName, email, jobTitle, birthdate)
  };

  useEffect(() => {
    fetchTableData(tableName, setEmployees);
  }, []);

  return (
    <Container maxWidth={`lg`}>
      <Stack direction={'column'} spacing={3} className={'page-content'}>
        <h1 className={`self-center`}>Employees</h1>
        <DataFrame tableName={tableName} rows={employees} setRows={setEmployees} />
        <CRUDSelect onChange={onQueryChange} />
        <TextField className={"self-center"} sx={{width:300}} id="employeeName-input" label="Employee Name" variant="outlined" type={`text`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={{width:300}} id="employeeEmail-input" label="Email" variant="outlined" type={`text`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={{width:300}} id="jobTitle-input" label="Job Title" variant="outlined" type={`text`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={{width:300}} id="birthdate-input" label="Birthdate" variant="outlined" type={`date`} color={`secondary`} placeholder='' onChange={onChange} />
        <Button className={`btn-blue w-fit self-center`} onClick={onSubmit}>Submit</Button>
      </Stack>
    </Container>
  )
}