import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.API_BASE_URL || 'http://localhost:8081';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams.toString();
  const res = await fetch(`${API_BASE}/api/products?${searchParams}`, { cache: 'no-store' });
  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const res = await fetch(`${API_BASE}/api/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
