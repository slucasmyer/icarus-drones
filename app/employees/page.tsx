"use client";
import { useState, useEffect } from 'react';
import { TextField, Stack, Container, Typography } from '@mui/material';
import Button from '@/components/Button';
import DataFrame from '@/components/DataFrame';
import { fetchTableData } from '@/utils/fetchTableData';
import { textFieldStyles } from '@/styles/textFieldStyles';


export default function Employees(props: any) {
  const [employeeName, setEmployeeName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [jobTitle, setJobTitle] = useState<string | null>(null);
  const [birthdate, setBirthdate] = useState<string | null>(null);
  const [employees, setEmployees] = useState<any[]>([]);
  const tableName = 'Employees';


  const onChange = async (e: any) => {
    const { id, value } = e.currentTarget || e.target;
    switch (id) {
      case 'name-input':
        setEmployeeName(value);
        break;
      case 'email-input':
        setEmail(value);
        break;
      case 'job-title-input':
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
    try {
      const route = `/api/records/create?table=${tableName}`;
      const config = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: employeeName, email: email, job_title: jobTitle, birthdate: birthdate })
      }
      const response = await fetch(route, config);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`${data.error}`);
      } else {
        fetchTableData(tableName, setEmployees);
        alert(`Created new row.`);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchTableData(tableName, setEmployees);
  }, []);

  return (
    <Container maxWidth={`lg`}>
      <Stack direction={'column'} spacing={3} className={'page-content'}>
        <h1 className={`self-center`}>Employees</h1>
        <DataFrame tableName={tableName} rows={employees} setRows={setEmployees} />
        <Typography variant={`h5`} className={`self-center`} sx={{color:'white'}}>Create New Employee</Typography>
        <TextField className={"self-center"} sx={textFieldStyles} id="name-input" label="Employee Name" variant="outlined" type={`text`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={textFieldStyles} id="email-input" label="Email" variant="outlined" type={`text`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={textFieldStyles} id="job-title-input" label="Job Title" variant="outlined" type={`text`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={textFieldStyles} id="birthdate-input" label="Birthdate" variant="outlined" type={`date`} color={`secondary`} placeholder='' onChange={onChange} />
        <Button className={`btn-blue w-fit self-center`} onClick={onSubmit}>Submit</Button>
      </Stack>
    </Container>
  )
}