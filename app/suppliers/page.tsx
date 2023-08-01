"use client"
import Image from 'next/image'
import { useState, useEffect, useContext } from 'react'
import styles from './suppliers.module.css'
import { TextField, Stack, Container } from '@mui/material'
import CRUDSelect from '@/components/CRUDSelect'
import Button from '@/components/Button'
import DataFrame from '@/components/DataFrame'


export default function Suppliers(props: any) {
  const [queryType, setQueryType] = useState<string | null>(null);
  const [supplierName, setSupplierName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const tableName = 'Suppliers';
  const columns = [
    { field: 'supplierID', headerName: 'ID', width: 90, type: 'number' },
    { field: 'name', headerName: 'Name', width: 150, type: 'string', editable: true },
    { field: 'email', headerName: 'Email', width: 150, type: 'string', editable: true },
    { field: 'location', headerName: 'Location', width: 150, type: 'string', editable: true },
    { field: 'phone', headerName: 'Phone', width: 150, type: 'string', editable: true },
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
  };

  const onChange = async (e: any) => {
    const { id, value } = e.currentTarget || e.target;
    switch (id) {
      case 'supplierName-input':
        setSupplierName(value);
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
    console.log(queryType, supplierName, email, location, phone)
  };

  useEffect(() => {
    fetch(`/api/records/read?table=${tableName}`)
      .then((response) => response.json())
      .then((data) => {
        setSuppliers(data);
      });
  }, []);

  return (
    <Container maxWidth={`lg`}>
      <Stack direction={'column'} spacing={3} className={'page-content'}>
        <h1 className={`self-center`}>Suppliers</h1>
        <DataFrame tableName={tableName} rows={suppliers} setRows={setSuppliers} columns={columns} />
        <CRUDSelect onChange={onQueryChange} />
        <TextField className={"self-center"} sx={{width:300}} id="supplierName-input" label="Supplier Name" variant="outlined" type={`text`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={{width:300}} id="supplierEmail-input" label="Email" variant="outlined" type={`text`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={{width:300}} id="location-input" label="Location" variant="outlined" type={`text`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={{width:300}} id="phone-input" label="Phone" variant="outlined" type={`text`} color={`secondary`} onChange={onChange} />
        <Button className={`btn-blue w-fit self-center`} onClick={onSubmit}>Submit</Button>

      </Stack>
    </Container>
  )
}