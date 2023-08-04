"use client";
import { useState, useEffect } from 'react';
import { TextField, Stack, Container, Typography } from '@mui/material';
import CRUDSelect from '@/components/CRUDSelect';
import Button from '@/components/Button';
import DataFrame from '@/components/DataFrame';
import { fetchTableData } from '@/utils/fetchTableData';

export default function Assignments(props: any) {
  const [queryType, setQueryType] = useState<string | null>(null);
  const [employeeID, setEmployeeID] = useState<string | null>(null);
  const [projectID, setProjectID] = useState<string | null>(null);
  const [assignmentDate, setAssignmentDate] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [hours, setHours] = useState<string | null>(null);
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
      case 'assignment-date-input':
        setAssignmentDate(value);
        break;
      case 'role-input':
        setRole(value);
        break;
      case 'hours-input':
        setHours(value);
        break;
      default:
        break;
    }
  };

  const onSubmit = async (e: any) => {
    console.log(employeeID, projectID, assignmentDate, role, hours)
    try {
      const route = `/api/records/create?table=${tableName}`;
      const config = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeID: employeeID, projectID: projectID, assignment_date: assignmentDate, role: role, hours: hours })
      }
      const response = await fetch(route, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        fetchTableData(tableName, setEmployeesProjects);
        alert(`Created new row`);
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
    fetchTableData(tableName, setEmployeesProjects);
  }, []);

  return (
    <Container maxWidth={`lg`}>
      <Stack direction={'column'} spacing={3} className={'page-content'}>
        <h1 className={`self-center`}>Employee Assignments</h1>
        <DataFrame tableName={tableName} rows={employeesProjects} setRows={setEmployeesProjects} />
        {/*<CRUDSelect onChange={onQueryChange} />*/}
        <Typography variant={`h5`} className={`self-center`} sx={{color:'white'}}>Create New Assignment</Typography>
        <TextField className={"self-center"} sx={{width:300}} id="employee-id-input" label="Employee ID" name="employeeID" variant="outlined" type={`number`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={{width:300}} id="project-id-input" label="Project ID" name="projectID" variant="outlined" type={`number`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={{width:300}} id="assignment-date-input" label="Assignment Date" name="assignment_date" variant="outlined" type={`date`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={{width:300}} id="role-input" label="Role" variant="outlined" name="role" type={`text`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={{width:300}} id="hours-input" label="Hours" variant="outlined" name="hours" type={`number`} color={`secondary`} onChange={onChange} />
        <Button className={`btn-blue w-fit self-center`} onClick={onSubmit}>Submit</Button>
      </Stack>
    </Container>
  )
}