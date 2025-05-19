-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "tourId" TEXT NOT NULL,
    "tourTitle" TEXT NOT NULL,
    "tourPrice" INTEGER NOT NULL,
    "tourNights" INTEGER NOT NULL,
    "tourTourists" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
