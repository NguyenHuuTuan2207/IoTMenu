-- CreateTable
CREATE TABLE "adminAccount" (
    "id" SERIAL NOT NULL,
    "ten" TEXT NOT NULL,
    "mat_khau" TEXT NOT NULL,

    CONSTRAINT "adminAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menuCoDong" (
    "id" SERIAL NOT NULL,
    "ten_mon" TEXT NOT NULL,
    "gia" INTEGER NOT NULL,
    "danh_muc" TEXT NOT NULL,

    CONSTRAINT "menuCoDong_pkey" PRIMARY KEY ("id")
);
