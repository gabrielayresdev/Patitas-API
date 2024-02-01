import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { Request, Response } from "express";

class ProdutoController {
  async createProduto(req: Request, res: Response) {
    try {
      const produto = await prisma.produto.create({
        data: req.body,
      });
      res.status(201).json(produto);
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async getAllProdutos(req: Request, res: Response) {
    try {
      const produtos = await prisma.produto.findMany();
      res.status(200).json(produtos);
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async getProduto(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const produto = await prisma.produto.findUnique({
        where: { id: Number(id) },
      });
      res.status(200).json(produto);
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async updateProduto(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const produto = await prisma.produto.update({
        where: { id: Number(id) },
        data: req.body,
      });
      res.status(200).json(produto);
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async deleteProduto(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const produto = await prisma.produto.delete({
        where: { id: Number(id) },
      });
      res.status(200).json(produto);
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}

export default ProdutoController;
