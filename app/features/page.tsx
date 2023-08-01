"use client"
import Image from 'next/image'
import { useState, useEffect, useContext } from 'react'
import { TextField, Stack, Container } from '@mui/material'
import CRUDSelect from '@/components/CRUDSelect'
import Button from '@/components/Button'
import DataFrame from '@/components/DataFrame';


export default function Features(props: any) {
  const [queryType, setQueryType] = useState<string | null>(null);
  const [featureName, setFeatureName] = useState<string | null>(null);
  const [purchasePrice, setPurchasePrice] = useState<number | null>(null);
  const [qtyInSupply, setQtyInSupply] = useState<number | null>(null);
  const [features, setFeatures] = useState<any[]>([]);
  const tableName = 'Features';
  const columns = [
    { field: 'featureID', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    { field: 'purchase_price', headerName: 'Purchase Price', width: 150, editable: true },
    { field: 'qty_in_supply', headerName: 'Quantity in Supply', width: 150, editable: true },
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
      case 'featureName-input':
        setFeatureName(value);
        break;
      case 'purchasePrice-input':
        setPurchasePrice(value);
        break;
      case 'qtyInSupply-input':
        setQtyInSupply(value);
        break;
      default:
        break;
    }
  };

  const onSubmit = async (e: any) => {
    console.log(queryType, featureName, purchasePrice, qtyInSupply)
  };

  useEffect(() => {
    fetch(`/api/records/read?table=${tableName}`)
      .then((response) => response.json())
      .then((data) => {
        setFeatures(data);
      });
  }, []);

  return (
    <Container maxWidth={`lg`}>
      <Stack direction={'column'} spacing={3} className={'page-content'}>
        <h1 className={`self-center`}>Features</h1>
        <DataFrame tableName={tableName} rows={features} setRows={setFeatures} columns={columns} />
        <CRUDSelect onChange={onQueryChange} />
        <TextField className={"self-center"} sx={{width:300}} id="featureName-input" label="Feature Name" variant="outlined" type={`text`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={{width:300}} id="purchasePrice-input" label="Purchase Price" variant="outlined" type={`number`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={{width:300}} id="qtyInSupply-input" label="Quantity in Supply" variant="outlined" type={`number`} color={`secondary`} onChange={onChange} />
        <Button className={`btn-blue w-fit self-center`} onClick={onSubmit}>Submit</Button>

      </Stack>
    </Container>
  )
}