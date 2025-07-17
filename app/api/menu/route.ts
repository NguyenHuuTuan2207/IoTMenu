// app/api/menu/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const menu = await prisma.menu.findMany();
  return NextResponse.json(menu);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { ten_mon, gia, danh_muc } = body;

  try {
    const newItem = await prisma.menu.create({
      data: { ten_mon, gia, danh_muc },
    });
    return NextResponse.json(newItem);
  } catch (error) {
    return NextResponse.json({ error: 'Thêm món thất bại' }, { status: 500 });
  }
}
