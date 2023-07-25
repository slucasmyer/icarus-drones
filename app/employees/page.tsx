"use client"
import Image from 'next/image'
import { useState, useEffect, useContext } from 'react'
import { TextField, Stack, Container } from '@mui/material'
import Button from '@/components/Button'


export default function Employees(props: any) {
  const [name, setName] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [password, setPassword] = useState<string | null>(null)
  const onChange = async (e: any) =>  {
    const { name, value } = e.currentTarget || e.target
    switch (name) {
      case 'name':
        setName(value)
        break;
      case 'email':
        setEmail(value)
        break;
      case 'password':
        setPassword(value)
        break;
      default:
        break;
    }
  }
  return (
    <Container maxWidth={`lg`}>
      <Stack direction={'column'} spacing={3} className={'page-content'}>
        <h1 className={`self-center`}>Employees</h1>
        <TextField className={"self-center"} sx={{width:300}} id="name-input" label="Name" variant="outlined" type={`text`} color={`secondary`} onChange={onChange} />
        <TextField className={"self-center"} sx={{width:300}} id="email-input" label="Email" variant="outlined" type={`text`} onChange={onChange} />
        <TextField className={"self-center"} sx={{width:300}} id="password-input" label="Password" variant="outlined" type={`text`} onChange={onChange} />
        <Button className={`btn-blue w-fit self-center`} onClick={async () => {
          console.log(`name: ${name}, email: ${email}, password: ${password}`)
          
        }}>Submit</Button>
      </Stack>
    </Container>
  )
}