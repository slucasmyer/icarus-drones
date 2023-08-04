"use client";
import { useState, useEffect } from 'react';
import { TextField, Stack, Container, Typography } from '@mui/material';
import CRUDSelect from '@/components/CRUDSelect';
import Button from '@/components/Button';
import DataFrame from '@/components/DataFrame';
import { fetchTableData } from '@/utils/fetchTableData';


export default function Suppliers(props: any) {
  const [queryType, setQueryType] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const tableName = 'Suppliers';

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
      case 'name-input':
        setName(value);
        break;
      case 'email-input':
        setEmail(value);
        break;
      case 'location-input':
        setLocation(value);
        break;
      case 'phone-input':
        setPhone(value);
        break;
      default:
        break;
    }
  };

  const onSubmit = async (e: any) => {
    console.log(name, email, location, phone)
    try {
      const route = `/api/records/create?table=${tableName}`;
      const config = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, email: email, location: location, phone: phone })
      }
      const response = await fetch(route, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        fetchTableData(tableName, setSuppliers);
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
    fetchTableData(tableName, setSuppliers);
  }, []);

  return (
    <Container maxWidth={`lg`}>
      <Stack direction={'column'} spacing={3} className={'page-content'}>
        <h1 className={`self-center`}>Suppliers</h1>
        <DataFrame tableName={tableName} rows={suppliers} setRows={setSuppliers} />
        {/*<CRUDSelect onChange={onQueryChange} />*/}
        <TextField className={"self-center"} sx={{width:300}} id="name-input" label="Supplier Name" variant="outlined" type={`text`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={{width:300}} id="email-input" label="Email" variant="outlined" type={`text`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={{width:300}} id="location-input" label="Location" variant="outlined" type={`text`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={{width:300}} id="phone-input" label="Phone" variant="outlined" type={`text`} color={`secondary`} onChange={onChange} />
        <Button className={`btn-blue w-fit self-center`} onClick={onSubmit}>Submit</Button>

      </Stack>
    </Container>
  )
}