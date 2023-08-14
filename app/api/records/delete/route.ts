import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/utils/db';
import { foreignKeyChecks } from '@/utils/foreignKeyChecks';

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url)
  const table = url.searchParams.get('table')
  const pk = url.searchParams.get('pk')
  const id = url.searchParams.get('id')
  if (!table || !pk || !id ) {
    return NextResponse.json({ error: 'Missing required query parameter.' }, { status: 400 })
  }
  if (isNaN(Number(id))) {
    return NextResponse.json({ error: 'ID must be numeric.' }, { status: 400 })
  }
  try {
    await pool.query(`DELETE FROM ${table} WHERE ${pk} = ?`, [id]);
    return NextResponse.json({ success: true, message: `Successfully deleted record from ${table} where ${pk} = ${id}.` });
  } catch (error) {
    return NextResponse.json({ error: `Cannot delete record with id: ${id}, as there are dependent records.` }, { status: 400 });
  }
}
