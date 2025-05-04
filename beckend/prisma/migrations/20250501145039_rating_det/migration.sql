/*
  Warnings:

  - You are about to drop the column `rating_availability_transport` on the `tours` table. All the data in the column will be lost.
  - You are about to drop the column `rating_childrens_zone` on the `tours` table. All the data in the column will be lost.
  - You are about to drop the column `rating_convenience_rooms` on the `tours` table. All the data in the column will be lost.
  - You are about to drop the column `rating_entertainment_excursions` on the `tours` table. All the data in the column will be lost.
  - You are about to drop the column `rating_infrastructure` on the `tours` table. All the data in the column will be lost.
  - You are about to drop the column `rating_location` on the `tours` table. All the data in the column will be lost.
  - You are about to drop the column `rating_pool` on the `tours` table. All the data in the column will be lost.
  - You are about to drop the column `rating_purity` on the `tours` table. All the data in the column will be lost.
  - You are about to drop the column `rating_room_service` on the `tours` table. All the data in the column will be lost.
  - You are about to drop the column `rating_wifi` on the `tours` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tours" DROP COLUMN "rating_availability_transport",
DROP COLUMN "rating_childrens_zone",
DROP COLUMN "rating_convenience_rooms",
DROP COLUMN "rating_entertainment_excursions",
DROP COLUMN "rating_infrastructure",
DROP COLUMN "rating_location",
DROP COLUMN "rating_pool",
DROP COLUMN "rating_purity",
DROP COLUMN "rating_room_service",
DROP COLUMN "rating_wifi",
ADD COLUMN     "rating_details" JSONB;
