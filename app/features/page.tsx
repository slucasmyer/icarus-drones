"use client"
import { useState, useEffect } from 'react';
import { TextField, Stack, Container, Typography } from '@mui/material';
import CRUDSelect from '@/components/CRUDSelect';
import Button from '@/components/Button';
import DataFrame from '@/components/DataFrame';
import { fetchTableData } from '@/utils/fetchTableData';


export default function Features(props: any) {
  const [queryType, setQueryType] = useState<string | null>(null);
  const [projectID, setProjectID] = useState<number | null>(null);
  const [supplierID, setSupplierID] = useState<number | null>(null);
  const [featureName, setFeatureName] = useState<string | null>(null);
  const [purchasePrice, setPurchasePrice] = useState<number | null>(null);
  const [qtyInSupply, setQtyInSupply] = useState<number | null>(null);
  const [features, setFeatures] = useState<any[]>([]);
  const tableName = 'Features';

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
      case 'project-id-input':
        setProjectID(value);
        break;
      case 'supplier-id-input':
        setSupplierID(value);
        break;
      case 'feature-name-input':
        setFeatureName(value);
        break;
      case 'purchase-price-input':
        setPurchasePrice(value);
        break;
      case 'qty-in-supply-input':
        setQtyInSupply(value);
        break;
      default:
        break;
    }
  };

  const onSubmit = async (e: any) => {
    console.log(featureName, purchasePrice, qtyInSupply)
    try {
      const route = `/api/records/create?table=${tableName}`;
      console.log(route)
      console.log({ name: featureName, purchase_price: purchasePrice, qty_in_supply: qtyInSupply })
      const config = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectID: projectID, supplierID: supplierID, name: featureName, purchase_price: purchasePrice, qty_in_supply: qtyInSupply })
      }
      const response = await fetch(route, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        fetchTableData(tableName, setFeatures);
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
    fetchTableData(tableName, setFeatures);
  }, []);

  return (
    <Container maxWidth={`lg`}>
      <Stack direction={'column'} spacing={3} className={'page-content'}>
        <h1 className={`self-center`}>Features</h1>
        <DataFrame tableName={tableName} rows={features} setRows={setFeatures} />
        {/*<CRUDSelect onChange={onQueryChange} />*/}
        <Typography variant={`h5`} className={`self-center`} sx={{color:'white'}}>Create New Feature</Typography>
        <TextField className={"self-center"} sx={{width:300}} id="project-id-input" label="Project ID" variant="outlined" type={`number`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={{width:300}} id="supplier-id-input" label="Supplier ID" variant="outlined" type={`number`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={{width:300}} id="feature-name-input" label="Feature Name" variant="outlined" type={`text`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={{width:300}} id="purchase-price-input" label="Purchase Price" variant="outlined" type={`number`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={{width:300}} id="qty-in-supply-input" label="Quantity in Supply" variant="outlined" type={`number`} color={`secondary`} onChange={onChange} />
        <Button className={`btn-blue w-fit self-center`} onClick={onSubmit}>Submit</Button>

      </Stack>
    </Container>
  )
}