import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/utils/db';

export async function PUT(request: NextRequest) {
  const url = new URL(request.url)
  const table = url.searchParams.get('table_name')
  const id = url.searchParams.get('id')
  const data = request.body;
  // validate data here before updating it
  // possibly throw an error if data is not valid

  await pool.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, id]);
  return NextResponse.json({ id, ...data });
}
