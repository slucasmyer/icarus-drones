"use client";
import { useState, useEffect } from 'react';
import { TextField, Stack, Container, Typography } from '@mui/material';
import CRUDSelect from '@/components/CRUDSelect';
import Button from '@/components/Button';
import DataFrame from '@/components/DataFrame';
import { fetchTableData } from '@/utils/fetchTableData';


export default function Projects(props: any) {
  const [queryType, setQueryType] = useState<string | null>(null);
  const [customerID, setCustomerID] = useState<number | null>(null);
  const [projectName, setProjectName] = useState<string | null>(null);
  const [estimateRelease, setEstimateRelease] = useState<string | null>(null);
  const [budget, setBudget] = useState<number | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const tableName = 'Projects';

  const onQueryChange = async (e: any) => {
    const { id, value } = e.currentTarget || e.target;
    switch (id) {
      case 'query-type-select':
        setQueryType(value);
        break;
      default:
        break;
    }
  }

  const onChange = async (e: any) => {
    const { id, value } = e.currentTarget || e.target;
    switch (id) {
      case 'customer-id-input':
        setCustomerID(value);
        break;
      case 'projectName-input':
        setProjectName(value);
        break;
      case 'estimateRelease-input':
        setEstimateRelease(value);
        break;
      case 'budget-input':
        setBudget(value);
        break;
      default:
        break;
    }
  };

  const onSubmit = async (e: any) => {
    console.log(queryType, projectName, estimateRelease, budget)
    try {
      const route = `/api/records/create?table=${tableName}`;
      const config = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerID: customerID, name: projectName, estimate_release: estimateRelease, budget: budget })
      }
      const response = await fetch(route, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        fetchTableData(tableName, setProjects);
        alert(`Created new row`);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    fetchTableData(tableName, setProjects);
  }, []);

  return (
    <Container maxWidth={`lg`}>
      <Stack direction={'column'} spacing={3} className={'page-content'}>
        <h1 className={`self-center`}>Projects</h1>
        <DataFrame tableName={tableName} rows={projects} setRows={setProjects} />
        {/*<CRUDSelect onChange={onQueryChange} />*/}
        <Typography variant={`h5`} className={`self-center`} sx={{color:'white'}}>Create New Project</Typography>
        <TextField className={"self-center"} sx={{width:300}} id="customer-id-input" label="Customer ID" variant="outlined" type={`number`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={{width:300}} id="projectName-input" label="Project Name" variant="outlined" type={`text`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={{width:300}} id="estimateRelease-input" label="Estimate Release" variant="outlined" type={`date`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={{width:300}} id="budget-input" label="Budget" variant="outlined" type={`number`} color={`secondary`} onChange={onChange} />
        <Button className={`btn-blue w-fit self-center`} onClick={onSubmit}>Submit</Button>
      </Stack>
    </Container>
  )
}