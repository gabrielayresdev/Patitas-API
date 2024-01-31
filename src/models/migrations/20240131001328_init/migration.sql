/*
  Warnings:

  - You are about to alter the column `telefone` on the `cliente` table. The data in that column could be lost. The data in that column will be cast from `VarChar(14)` to `VarChar(14)`.

*/
-- AlterTable
ALTER TABLE "cliente" ALTER COLUMN "telefone" SET NOT NULL,
ALTER COLUMN "telefone" SET DATA TYPE VARCHAR(14);
