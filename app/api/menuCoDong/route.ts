// app/api/menuCoDong/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const menuCoDong = await prisma.menuCoDong.findMany();
  return NextResponse.json(menuCoDong);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { ten_mon, gia, danh_muc } = body;

  try {
    const newItem = await prisma.menuCoDong.create({
      data: { ten_mon, gia, danh_muc },
    });
    return NextResponse.json(newItem);
  } catch (error) {
    return NextResponse.json({ error: 'Thêm món thất bại' }, { status: 500 });
  }
}
