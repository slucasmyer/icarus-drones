import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/utils/db';

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const table = url.searchParams.get('table')
  const [rows] = await pool.query(`SELECT * FROM ${table}`);
  console.log(rows)
  // const hardRows = [
  //   {'id': 1, 'name': 'John Doe', 'email': 'john.doe@icarusdrones.com', 'jobTitle': 'CEO', 'birthdate': '1990-11-10'},
  //   {'id': 2, 'name': 'Jane Doe', 'email': 'jane.doe@icarusdrones.com', 'jobTitle': 'COO', 'birthdate': '1993-12-09'},
  //   {'id': 3, 'name': 'Cade Smith', 'email': 'cade.smith@icarusdrones.com', 'jobTitle': 'CFO', 'birthdate': '1986-07-08'}
  // ]
  return NextResponse.json(rows);
}
