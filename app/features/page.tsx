"use client"
import Image from 'next/image'
import { useState, useEffect, useContext } from 'react'
import { TextField, Stack, Container } from '@mui/material'
import CRUDSelect from '@/components/CRUDSelect'
import Button from '@/components/Button'


export default function Features(props: any) {
  const [queryType, setQueryType] = useState<string | null>(null);
  const [featureName, setFeatureName] = useState<string | null>(null);
  const [purchasePrice, setPurchasePrice] = useState<number | null>(null);
  const [qtyInSupply, setQtyInSupply] = useState<number | null>(null);

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

  return (
    <Container maxWidth={`lg`}>
      <Stack direction={'column'} spacing={3} className={'page-content'}>
        <h1 className={`self-center`}>Features</h1>
        <CRUDSelect onChange={onQueryChange} />
        <TextField className={"self-center"} sx={{width:300}} id="featureName-input" label="Feature Name" variant="outlined" type={`text`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={{width:300}} id="purchasePrice-input" label="Purchase Price" variant="outlined" type={`number`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={{width:300}} id="qtyInSupply-input" label="Quantity in Supply" variant="outlined" type={`number`} color={`secondary`} onChange={onChange} />
        <Button className={`btn-blue w-fit self-center`} onClick={onSubmit}>Submit</Button>

      </Stack>
    </Container>
  )
}