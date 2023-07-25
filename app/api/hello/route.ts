import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: Request) {
  const response = {
    name: new URL(request.url).searchParams.get('name'),
    time: new Date().toISOString(),
    message: 'hello'
  }
  return NextResponse.json(response)
}