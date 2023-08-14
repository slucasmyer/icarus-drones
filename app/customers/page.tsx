"use client";
import { useState, useEffect } from 'react';
import { TextField, Stack, Container, Typography } from '@mui/material';
import Button from '@/components/Button';
import DataFrame from '@/components/DataFrame';
import { fetchTableData } from '@/utils/fetchTableData';
import { textFieldStyles } from '@/styles/textFieldStyles';

export default function Customers(props: any) {
  const [customerName, setCustomerName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [customers, setCustomers] = useState<any[]>([]);
  const tableName = 'Customers';

  const onChange = async (e: any) => {
    const { id, value } = e.currentTarget || e.target;
    switch (id) {
      case 'name-input':
        setCustomerName(value);
        break;
      case 'email-input':
        setEmail(value);
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
        body: JSON.stringify({ name: customerName, email: email })
      }
      const response = await fetch(route, config);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`${data.error}`);
      } else {
        fetchTableData(tableName, setCustomers);
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
    fetchTableData(tableName, setCustomers);
  }, []);

  return (
    <Container maxWidth={`lg`}>
      <Stack direction={'column'} spacing={3} className={'page-content'}>
        <h1 className={`self-center`}>Customers</h1>
        <DataFrame tableName={tableName} rows={customers} setRows={setCustomers} />
        <Typography variant={`h5`} className={`self-center`} sx={{color:'white'}}>Create New Customer</Typography>
        <TextField className={"self-center"} sx={textFieldStyles} id="name-input" label="Customer Name" variant="outlined" type={`text`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={textFieldStyles} id="email-input" label="Customer Email" variant="outlined" type={`email`} color={`secondary`} onChange={onChange} />
        <Button className={`btn-blue w-fit self-center`} onClick={onSubmit}>Submit</Button>
      </Stack>
    </Container>
  )
}