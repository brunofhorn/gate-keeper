/*
  Warnings:

  - You are about to drop the column `employeeId` on the `Visitor` table. All the data in the column will be lost.
  - You are about to drop the column `observations` on the `Visitor` table. All the data in the column will be lost.
  - You are about to drop the column `visitDate` on the `Visitor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Visitor" DROP CONSTRAINT "Visitor_employeeId_fkey";

-- AlterTable
ALTER TABLE "Visitor" DROP COLUMN "employeeId",
DROP COLUMN "observations",
DROP COLUMN "visitDate";
