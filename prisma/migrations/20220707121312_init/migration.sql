-- AlterTable
ALTER TABLE "User" ADD COLUMN     "ratingId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_ratingId_fkey" FOREIGN KEY ("ratingId") REFERENCES "Rating"("id") ON DELETE SET NULL ON UPDATE CASCADE;
