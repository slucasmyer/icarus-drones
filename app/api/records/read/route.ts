import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/utils/db';

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const table = url.searchParams.get('table')
  const [rows] = await pool.query(`SELECT * FROM ${table}`);
  return NextResponse.json(rows);
}
