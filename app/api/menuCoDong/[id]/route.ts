// app/api/menuCoDong/[id]/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { ten_mon, gia, danh_muc } = await req.json();
  const id = parseInt(params.id);

  try {
    const updated = await prisma.menuCoDong.update({
      where: { id },
      data: { ten_mon, gia, danh_muc },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Cập nhật thất bại' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  try {
    await prisma.menuCoDong.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Xóa thất bại' }, { status: 500 });
  }
}
