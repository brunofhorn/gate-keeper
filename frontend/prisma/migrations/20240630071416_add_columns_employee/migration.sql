/*
  Warnings:

  - Added the required column `birthDate` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "birthDate" TEXT NOT NULL,
ADD COLUMN     "department" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL;
