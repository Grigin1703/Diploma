-- AlterTable
ALTER TABLE "tours" ADD COLUMN     "pricesByDuration" JSONB NOT NULL DEFAULT '{}';
