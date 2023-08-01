"use client"
import { useState, useEffect, useContext } from 'react'
import { TextField, Stack, Container } from '@mui/material'
import CRUDSelect from '@/components/CRUDSelect'
import Button from '@/components/Button'
import DataFrame from '@/components/DataFrame'
import { GridValueGetterParams } from '@mui/x-data-grid'


export default function Projects(props: any) {
  const [queryType, setQueryType] = useState<string | null>(null);
  const [projectName, setProjectName] = useState<string | null>(null);
  const [estimateRelease, setEstimateRelease] = useState<string | null>(null);
  const [budget, setBudget] = useState<number | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const tableName = 'Projects';
  const columns = [
    { field: 'projectID', headerName: 'ID', width: 90, type: 'number' },
    { field: 'customerID', headerName: 'ID', width: 90, type: 'number' },
    { field: 'name', headerName: 'Name', width: 150, type: 'string', editable: true },
    { field: 'estimate_release', headerName: 'Estimate Release', width: 150, type: 'date', valueGetter: (params: GridValueGetterParams) => new Date(params.value), editable: true },
    { field: 'budget', headerName: 'Budget', width: 150, type: 'number', editable: true },
  ];

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
  }

  useEffect(() => {
    fetch(`/api/records/read?table=${tableName}`)
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
      });
  }, []);

  return (
    <Container maxWidth={`lg`}>
      <Stack direction={'column'} spacing={3} className={'page-content'}>
        <h1 className={`self-center`}>Projects</h1>
        <DataFrame tableName={tableName} rows={projects} setRows={setProjects} columns={columns} />
        <CRUDSelect onChange={onQueryChange} />
        <TextField className={"self-center"} sx={{width:300}} id="projectName-input" label="Project Name" variant="outlined" type={`text`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={{width:300}} id="estimateRelease-input" label="Estimate Release" variant="outlined" type={`date`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={{width:300}} id="budget-input" label="Budget" variant="outlined" type={`number`} color={`secondary`} onChange={onChange} />
        <Button className={`btn-blue w-fit self-center`} onClick={onSubmit}>Submit</Button>
      </Stack>
    </Container>
  )
}