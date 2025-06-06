/*
  Warnings:

  - You are about to drop the `rooms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_tour_id_fkey";

-- AlterTable
ALTER TABLE "tours" ADD COLUMN     "rooms" JSONB;

-- DropTable
DROP TABLE "rooms";
