-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cnpj" TEXT NOT NULL,
    "razaoSocial" TEXT NOT NULL,
    "nomeFantasia" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "andar" TEXT,
    "sala" TEXT
);
INSERT INTO "new_Company" ("andar", "cnpj", "id", "nomeFantasia", "razaoSocial", "sala", "telefone") SELECT "andar", "cnpj", "id", "nomeFantasia", "razaoSocial", "sala", "telefone" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
CREATE UNIQUE INDEX "Company_cnpj_key" ON "Company"("cnpj");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
