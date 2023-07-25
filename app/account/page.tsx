"use client";
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Container, Stack, Box } from '@mui/material'
import { useRouter } from 'next/navigation';
import Button from '../../components/Button';

export default function Account(props: any) {

  return (
    <Container maxWidth={`lg`}>
      <Stack direction={'column'} spacing={3} className={'page-content'}>
        <h1 className={'self-center'}>Account</h1>
        <Button className={`btn-blue w-fit self-center`} onClick={() => alert('account page')}>Create Account</Button>
      </Stack>
    </Container>
  );
};