-- CreateTable
CREATE TABLE "menu" (
    "id" SERIAL NOT NULL,
    "ten_mon" TEXT NOT NULL,
    "gia" INTEGER NOT NULL,
    "danh_muc" TEXT NOT NULL,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);
