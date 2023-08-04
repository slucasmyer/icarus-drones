import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/utils/db';

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url)
  const table = url.searchParams.get('table')
  const pk = url.searchParams.get('pk')
  const id = url.searchParams.get('id')
  if (!table || !pk || !id ) {
    return NextResponse.json(new Error('Missing required query parameter.'))
  }
  if (isNaN(Number(id))) {
    return NextResponse.json(new Error('ID must be numeric.'))
  }
  await pool.query(`DELETE FROM ${table} WHERE ${pk} = ?`, [id]);
  return NextResponse.json({ message: `Deleted record with id: ${id}` });
}
