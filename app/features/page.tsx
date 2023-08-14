"use client"
import { useState, useEffect } from 'react';
import { TextField, Stack, Container, Typography } from '@mui/material';
import Button from '@/components/Button';
import DataFrame from '@/components/DataFrame';
import { fetchTableData } from '@/utils/fetchTableData';
import { textFieldStyles } from '@/styles/textFieldStyles';

export default function Features(props: any) {
  const [projectID, setProjectID] = useState<number | null>(null);
  const [supplierID, setSupplierID] = useState<number | null>(null);
  const [featureName, setFeatureName] = useState<string | null>(null);
  const [purchasePrice, setPurchasePrice] = useState<number | null>(null);
  const [qtyInSupply, setQtyInSupply] = useState<number | null>(null);
  const [features, setFeatures] = useState<any[]>([]);
  const tableName = 'Features';

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
    try {
      const route = `/api/records/create?table=${tableName}`;
      const config = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectID: projectID, supplierID: supplierID, name: featureName, purchase_price: purchasePrice, qty_in_supply: qtyInSupply })
      }
      const response = await fetch(route, config);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`${data.error}`);
      } else {
        fetchTableData(tableName, setFeatures);
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
    fetchTableData(tableName, setFeatures);
  }, []);

  return (
    <Container maxWidth={`lg`}>
      <Stack direction={'column'} spacing={3} className={'page-content'}>
        <h1 className={`self-center`}>Features</h1>
        <DataFrame tableName={tableName} rows={features} setRows={setFeatures} />
        <Typography variant={`h5`} className={`self-center`} sx={{color:'white'}}>Create New Feature</Typography>
        <TextField className={"self-center"} sx={textFieldStyles} id="project-id-input" label="Project ID" variant="outlined" type={`number`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={textFieldStyles} id="supplier-id-input" label="Supplier ID" variant="outlined" type={`number`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={textFieldStyles} id="feature-name-input" label="Feature Name" variant="outlined" type={`text`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={textFieldStyles} id="purchase-price-input" label="Purchase Price" variant="outlined" type={`number`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={textFieldStyles} id="qty-in-supply-input" label="Quantity in Supply" variant="outlined" type={`number`} color={`secondary`} onChange={onChange} />
        <Button className={`btn-blue w-fit self-center`} onClick={onSubmit}>Submit</Button>

      </Stack>
    </Container>
  )
}