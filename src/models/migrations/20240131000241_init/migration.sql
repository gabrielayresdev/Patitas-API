/*
  Warnings:

  - The primary key for the `compra` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `compra` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "compra" DROP CONSTRAINT "compra_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "compra_pkey" PRIMARY KEY ("data", "cliente_id", "produto_id");
