import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { ten, mat_khau } = await req.json();

  try {
    const admin = await prisma.adminAccount.findFirst({
      where: {
        ten,
        mat_khau,
      },
    });

    if (admin) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, message: 'Sai thông tin đăng nhập' }, { status: 401 });
    }
  } catch (error) {
    console.error('Lỗi khi truy vấn Prisma:', error);
    return NextResponse.json({ success: false, error: 'Lỗi server' }, { status: 500 });
  }
}
