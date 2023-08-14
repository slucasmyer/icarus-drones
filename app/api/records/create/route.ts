import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/utils/db';
import { foreignKeyChecks } from '@/utils/foreignKeyChecks';

export async function POST(request: NextRequest) {
  const url = new URL(request.url)
  const table = url.searchParams.get('table')
  const data = await request.json();
  if (!table || !data) {
    return NextResponse.json({ error: 'Missing required query parameter.' }, { status: 400 })
  }

  const checks = foreignKeyChecks[table as keyof typeof foreignKeyChecks];
  const keys = Object.keys(data);
  const values = Object.values(data);
  if (checks) {
    for (const field in keys) {
      const typedValue = data[field];
      for (const check of checks) {
        if (field === check.field) {
          console.log('check', check, 'typedValue', typedValue)
          const [rows] = await pool.query(check.query, [typedValue]);
          if (!rows || !Array.isArray(rows) || rows.length === 0) {
            console.log('rows', rows)
            return NextResponse.json({ error: `Invalid value for ${field}. Please Select a valid ${field} and try again.` }, { status: 400 })
          }
        }
      }
    }
  }
  try {
    const columns = keys.join(', ');
    const placeholders = values.map(() => '?').join(', ');
    const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
    await pool.query(sql, values);
    return NextResponse.json({ success: true, message: 'Data inserted successfully.' });
  } catch (error) {
    return NextResponse.json({ error: `Something went wrong. Please see Database Administrator.` }, { status: 400 });
  }

  
}
