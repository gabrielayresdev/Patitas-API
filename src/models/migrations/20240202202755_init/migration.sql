/*
  Warnings:

  - You are about to drop the `cliente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `compra` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `produto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "compra" DROP CONSTRAINT "compra_cliente_id_fkey";

-- DropForeignKey
ALTER TABLE "compra" DROP CONSTRAINT "compra_produto_id_fkey";

-- DropTable
DROP TABLE "cliente";

-- DropTable
DROP TABLE "compra";

-- DropTable
DROP TABLE "produto";
