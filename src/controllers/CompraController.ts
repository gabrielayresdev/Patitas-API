import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { Request, Response } from "express";

class CompraController {
  async comprar(req: Request, res: Response) {
    try {
      // Captura os dados de login do cliente
      const authHeader = req.headers.authorization;
      if (!authHeader) throw new Error("Cliente não encontrado");

      const credentials = Buffer.from(authHeader.split(" ")[1], "base64")
        .toString()
        .split(":");
      const username = credentials[0];
      const password = credentials[1];

      // Pesquisa o cliente no db
      const cliente = await prisma.cliente.findUnique({
        where: { email: username, senha: password },
      });
      if (!cliente) throw new Error("Cliente não encontrado");

      // Pesquisa o produto no db
      const { produtoId, quantidade } = req.body;
      const produto = await prisma.produto.findUnique({
        where: { id: Number(produtoId) },
      });

      if (!produto) throw new Error("Produto não encontrado");

      console.log(cliente);
      console.log("==========");
      console.log(produto);

      // Cria a compra
      const compra = await prisma.compra.create({
        data: {
          cliente_id: cliente.id,
          produto_id: produto.id,
          quantidade: quantidade,
          valor: Number(produto.preco) * quantidade,
        },
      });

      res.status(200).json(compra);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  }

  async compras(req: Request, res: Response) {
    try {
      const compras = await prisma.compra.findMany();
      res.status(200).json(compras);
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      //const { data, produtoId, clienteId } = req.body;
      const { id } = req.params;
      const compra = await prisma.compra.delete({
        /* where: {
          data_cliente_id_produto_id: {
            data,
            cliente_id: Number(clienteId),
            produto_id: Number(produtoId),
          },
        }, */
        where: { id: Number(id) },
      });
      res.status(200).json(compra);
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}

export default new CompraController();
