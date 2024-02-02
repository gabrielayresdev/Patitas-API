import { Request, Response } from "express";
import Auth from "../config/auth";

import { PrismaClient } from "@prisma/client";
import filtrarDadosDoCliente from "../utils/filtrarDadosDoCliente";
const prisma = new PrismaClient();

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const cliente = await prisma.cliente.findUnique({
        where: { email: req.body.email },
      });
      if (!cliente)
        return res.status(404).json({ message: "Usuário não encontrado." });
      const { senha } = req.body;
      if (Auth.checkPassword(senha, cliente.hash, cliente.salt)) {
        const token = Auth.generateJWT(cliente);
        return res.status(200).json({ token: token });
      } else {
        return res.status(401).json({ message: "Senha inválida." });
      }
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  async getDetails(req: Request, res: Response) {
    try {
      const token = Auth.getToken(req);
      const payload = Auth.decodeJWT(token);
      const cliente = await prisma.cliente.findUnique({
        where: { id: payload.sub },
      });
      if (!cliente)
        return res.status(404).json({ message: "Usuário não encontrado." });
      return res.status(200).json(filtrarDadosDoCliente(cliente));
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
}

export default new AuthController();
