/*
  Warnings:

  - Made the column `expiration` on table `Respiration` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Respiration" ALTER COLUMN "expiration" SET NOT NULL;
