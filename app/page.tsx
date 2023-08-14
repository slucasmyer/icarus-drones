"use client"
import { Stack, Container } from '@mui/material'


export default function Home(props: any) {
  return (
    <Container maxWidth={`lg`}>
      <Stack direction={'column'} spacing={3} className={'page-content'}>
      {Array(7).fill(undefined).map((_, i) => ( <h1 key={i} className={`self-center`}>DRONES FOR EVERYONE</h1> ))}
      </Stack>
    </Container>
  )
}