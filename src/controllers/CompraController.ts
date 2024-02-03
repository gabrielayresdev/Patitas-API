import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { Request, Response } from "express";
import Auth from "../config/auth";
import { validationResult } from "express-validator";

class CompraController {
  async comprar(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }

      const token = Auth.getToken(req);
      const payload = Auth.decodeJWT(token);
      const cliente = await prisma.cliente.findUnique({
        where: { id: payload.sub },
      });
      if (!cliente)
        return res.status(404).json({ message: "Usuário não encontrado." });

      // Pesquisa o produto no db
      const { produtoId, quantidade } = req.body;
      const produto = await prisma.produto.findUnique({
        where: { id: Number(produtoId) },
      });

      if (!produto) throw new Error("Produto não encontrado");

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
      const { id } = req.params;
      const compra = await prisma.compra.delete({
        where: { id: Number(id) },
      });
      res.status(200).json(compra);
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}

export default new CompraController();
