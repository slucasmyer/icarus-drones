"use client";
import { useState, useEffect } from 'react';
import { TextField, Stack, Container, Typography } from '@mui/material';
import Button from '@/components/Button';
import DataFrame from '@/components/DataFrame';
import { fetchTableData } from '@/utils/fetchTableData';
import { textFieldStyles } from '@/styles/textFieldStyles';

export default function Suppliers(props: any) {
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const tableName = 'Suppliers';

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
    try {
      const route = `/api/records/create?table=${tableName}`;
      const config = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, email: email, location: location, phone: phone })
      }
      const response = await fetch(route, config);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`${data.error}`);
      } else {
        fetchTableData(tableName, setSuppliers);
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
    fetchTableData(tableName, setSuppliers);
  }, []);

  return (
    <Container maxWidth={`lg`}>
      <Stack direction={'column'} spacing={3} className={'page-content'}>
        <h1 className={`self-center`}>Suppliers</h1>
        <DataFrame tableName={tableName} rows={suppliers} setRows={setSuppliers} />
        <TextField className={"self-center"} sx={textFieldStyles} id="name-input" label="Supplier Name" variant="outlined" type={`text`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={textFieldStyles} id="email-input" label="Email" variant="outlined" type={`text`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={textFieldStyles} id="location-input" label="Location" variant="outlined" type={`text`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={textFieldStyles} id="phone-input" label="Phone" variant="outlined" type={`text`} color={`secondary`} onChange={onChange} />
        <Button className={`btn-blue w-fit self-center`} onClick={onSubmit}>Submit</Button>

      </Stack>
    </Container>
  )
}