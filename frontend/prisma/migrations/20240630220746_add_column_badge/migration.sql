/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Badge` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Badge_code_key" ON "Badge"("code");
