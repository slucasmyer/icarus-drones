import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/utils/db';
import { foreignKeyChecks } from '@/utils/foreignKeyChecks';


export async function PUT(request: NextRequest) {
  const url = new URL(request.url)
  const table = url.searchParams.get('table')
  const pk = url.searchParams.get('pk')
  const id = url.searchParams.get('id')
  const { field, value, valueType } = await request.json();
  const typedValue: string | number = valueType === 'number' ? Number(value) : value;
  if (!table || !pk || !id || !field) {
    return NextResponse.json({ error: 'Missing required query parameter.' }, { status: 400 })
  }
  if (isNaN(Number(id))) {
    return NextResponse.json({ error: 'ID must be numeric.' }, { status: 400 })
  }
  if (value === undefined) {
    return NextResponse.json({ error: 'Value cannot be undefined, but can be null.' }, { status: 400 })
  }

  const checks = foreignKeyChecks[table as keyof typeof foreignKeyChecks];
  if (checks) {
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
  try {
    const sql = `UPDATE ?? SET ?? = ? WHERE ${pk} = ?`;
    await pool.query(sql, [table, field, value, id]);
    return NextResponse.json({ success: true, message: `Successfully updated ${field} to ${value}.` });
  } catch (error) {
    return NextResponse.json({ error: `Something went wrong. Please see Database Administrator.` }, { status: 400 });
  }
}