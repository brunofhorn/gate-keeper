/*
  Warnings:

  - You are about to drop the column `andar` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `nomeFantasia` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `razaoSocial` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `sala` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `Company` table. All the data in the column will be lost.
  - Added the required column `companyName` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tradeName` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "andar",
DROP COLUMN "nomeFantasia",
DROP COLUMN "razaoSocial",
DROP COLUMN "sala",
DROP COLUMN "telefone",
ADD COLUMN     "companyName" TEXT NOT NULL,
ADD COLUMN     "floor" TEXT,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "room" TEXT,
ADD COLUMN     "tradeName" TEXT NOT NULL;
