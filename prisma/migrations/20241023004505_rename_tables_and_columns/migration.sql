/*
  Warnings:

  - You are about to drop the `Child` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Child" DROP CONSTRAINT "Child_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_accountId_fkey";

-- DropTable
DROP TABLE "Child";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Lead" (
    "id" SERIAL NOT NULL,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Phone" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "City" TEXT NOT NULL,
    "Province" TEXT NOT NULL,
    "PostalCode" TEXT NOT NULL,
    "accountId" INTEGER NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student_c" (
    "id" SERIAL NOT NULL,
    "First_Name__c" TEXT NOT NULL,
    "Last_Name__c" TEXT NOT NULL,
    "Birthdate__c" TIMESTAMP(3) NOT NULL,
    "Grade_of_Interest__c" TEXT NOT NULL,
    "Entry_Year__c" TEXT NOT NULL,
    "Parent__c" INTEGER NOT NULL,

    CONSTRAINT "Student_c_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lead_accountId_key" ON "Lead"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_c_Parent__c_key" ON "Student_c"("Parent__c");

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student_c" ADD CONSTRAINT "Student_c_Parent__c_fkey" FOREIGN KEY ("Parent__c") REFERENCES "Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
