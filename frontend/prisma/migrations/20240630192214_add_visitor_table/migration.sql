-- CreateTable
CREATE TABLE "Visitor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "visitDate" TEXT NOT NULL,
    "observations" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,

    CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Visitor_cpf_key" ON "Visitor"("cpf");

-- AddForeignKey
ALTER TABLE "Visitor" ADD CONSTRAINT "Visitor_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
