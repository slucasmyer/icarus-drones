"use client"
import Image from 'next/image'
import { useState, useEffect, useContext } from 'react'
import { TextField, Stack, Container } from '@mui/material'
import Button from '@/components/Button'


export default function Home(props: any) {
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
      {Array(7).fill(undefined).map((_, i) => ( <h1 key={i} className={`self-center`}>DRONES FOR EVERYONE</h1> ))}
      </Stack>
    </Container>
  )
}