import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/utils/db';

export async function POST(request: NextRequest) {
  const url = new URL(request.url)
  const table = url.searchParams.get('table_name')
  const data = request.body;
  // validate data here before saving it
  // possibly throw an error if data is not valid
 
  const [results] = await pool.query(`INSERT INTO ${table} SET ?`, [data]);
  return NextResponse.json(results);
}
