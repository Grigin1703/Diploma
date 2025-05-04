/*
  Warnings:

  - You are about to drop the column `all_inclusive` on the `tours` table. All the data in the column will be lost.
  - You are about to drop the column `bed_and_breakfast` on the `tours` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tours" DROP COLUMN "all_inclusive",
DROP COLUMN "bed_and_breakfast",
ADD COLUMN     "mealPlans" JSONB;
