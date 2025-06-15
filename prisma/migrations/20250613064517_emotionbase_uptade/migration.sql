/*
Warnings:

- You are about to drop the column `emotionBase` on the `Emotion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Emotion"
DROP COLUMN "emotionBase",
ADD COLUMN "emotionBase" TEXT;