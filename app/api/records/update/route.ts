import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/utils/db';


export async function PUT(request: NextRequest) {
  const url = new URL(request.url)
  const table = url.searchParams.get('table')
  const pk = url.searchParams.get('pk')
  const id = url.searchParams.get('id')
  const { field, value, valueType } = await request.json();
  const typedValue: string | number = valueType === 'number' ? Number(value) : value;
  if (!table || !pk || !id || !field) {
    return NextResponse.json(new Error('Missing required query parameter.'))
  }
  if (isNaN(Number(id))) {
    return NextResponse.json(new Error('ID must be numeric.'))
  }
  if (value === undefined) {
    return NextResponse.json(new Error('Value cannot be undefined, but can be null.'))
  }
  const sql = `UPDATE ?? SET ?? = ? WHERE ${pk} = ?`;
  await pool.query(sql, [table, field, value, id]);
  return NextResponse.json({field: field, value: value, valType: valueType, typedValue: typedValue});
}