/*
  Warnings:

  - You are about to drop the column `Province` on the `Lead` table. All the data in the column will be lost.
  - Added the required column `Address` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "Province",
ADD COLUMN     "Address" TEXT NOT NULL;
