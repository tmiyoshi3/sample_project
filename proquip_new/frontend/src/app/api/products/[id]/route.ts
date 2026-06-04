import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.API_BASE_URL || 'http://localhost:8081';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const res = await fetch(`${API_BASE}/api/products/${params.id}`, { cache: 'no-store' });
  if (!res.ok) return NextResponse.json(null, { status: res.status });
  const data = await res.json();
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json();
  const res = await fetch(`${API_BASE}/api/products/${params.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await fetch(`${API_BASE}/api/products/${params.id}`, { method: 'DELETE' });
  return NextResponse.json({ ok: true });
}
