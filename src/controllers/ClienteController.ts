import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { Request, Response } from "express";
import auth from "../config/auth";
import filtrarDadosDoCliente from "../utils/FiltrarDadosDoCliente";

/* async function teste(req: Request, res: Response) {
  res.status(200).send("Funcionou");
} */

class ClienteController {
  async createUser(req: Request, res: Response) {
    try {
      const { nome, cpf, email, senha, telefone } = req.body;
      const { hash, salt } = auth.generatePassword(senha);

      const cliente = await prisma.cliente.create({
        data: { nome, cpf, email, telefone, hash, salt },
      });
      res.status(201).json(filtrarDadosDoCliente(cliente));
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const clientes = await prisma.cliente.findMany();
      res.status(200).json(clientes);
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const cliente = await prisma.cliente.findUnique({
        where: { id: Number(id) },
      });
      res.status(200).json(cliente);
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const cliente = await prisma.cliente.update({
        where: { id: Number(id) },
        data: req.body,
      });
      res.status(200).json(cliente);
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const cliente = await prisma.cliente.delete({
        where: { id: Number(id) },
      });
      res.status(200).json(cliente);
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}

export default new ClienteController();
