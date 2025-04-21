/*
  Warnings:

  - The primary key for the `Soumet` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Soumet" DROP CONSTRAINT "Soumet_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Soumet_pkey" PRIMARY KEY ("id");
