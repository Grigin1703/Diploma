/*
  Warnings:

  - The `image_url` column on the `imges` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "imges" DROP COLUMN "image_url",
ADD COLUMN     "image_url" JSONB;
