import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/utils/db';

export async function POST(request: NextRequest) {
  const url = new URL(request.url)
  const table = url.searchParams.get('table')
  const data = await request.json();
  if (!table || !data) {
    return NextResponse.json(new Error('Missing required query parameter.'))
  }

  const columns = Object.keys(data).join(', ');
  const values = Object.values(data);
  const placeholders = values.map(() => '?').join(', ');

  const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;

  await pool.query(sql, values);
  
  return NextResponse.json({ message: 'Data inserted successfully.' });
}
