import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/utils/db';

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url)
  const table = url.searchParams.get('table_name')
  const id = url.searchParams.get('id')
  await pool.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
  return NextResponse.json({ message: `Deleted record with id: ${id}` });
}
