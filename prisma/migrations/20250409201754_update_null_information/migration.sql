/*
  Warnings:

  - Made the column `titre` on table `Information` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contenu` on table `Information` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Information" ALTER COLUMN "titre" SET NOT NULL,
ALTER COLUMN "contenu" SET NOT NULL;
