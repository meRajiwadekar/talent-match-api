/*
  Warnings:

  - You are about to drop the column `ratingId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_ratingId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "ratingId";
