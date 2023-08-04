"use client";
import { useState, useEffect } from 'react';
import { TextField, Stack, Container } from '@mui/material';
import CRUDSelect from '@/components/CRUDSelect';
import Button from '@/components/Button';
import DataFrame from '@/components/DataFrame';
import { fetchTableData } from '@/utils/fetchTableData';

export default function Customers(props: any) {
  const [queryType, setQueryType] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [customers, setCustomers] = useState<any[]>([]);
  const tableName = 'Customers';
  
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
      case 'customerName-input':
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
    console.log(queryType, customerName, email)
  };

  useEffect(() => {
    fetchTableData(tableName, setCustomers);
  }, []);

  return (
    <Container maxWidth={`lg`}>
      <Stack direction={'column'} spacing={3} className={'page-content'}>
        <h1 className={`self-center`}>Customers</h1>
        <DataFrame tableName={tableName} rows={customers} setRows={setCustomers} />
        <CRUDSelect onChange={onQueryChange} />
        <TextField className={"self-center"} sx={{width:300}} id="customer-name-input" label="Customer Name" variant="outlined" type={`text`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={{width:300}} id="customer-email-input" label="Customer Email" variant="outlined" type={`email`} color={`secondary`} onChange={onChange} />
        <Button className={`btn-blue w-fit self-center`} onClick={onSubmit}>Submit</Button>
      </Stack>
    </Container>
  )
}