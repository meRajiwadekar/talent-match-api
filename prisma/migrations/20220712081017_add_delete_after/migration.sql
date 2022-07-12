/*
  Warnings:

  - Added the required column `delete_after` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "delete_after" TIMESTAMP(3) NOT NULL;
