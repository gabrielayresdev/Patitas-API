import Auth from "../config/auth";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { Request, Response, NextFunction } from "express";

async function adm(req: Request, res: Response, next: NextFunction) {
  try {
    const token = Auth.getToken(req);
    const payload = Auth.decodeJWT(token);
    const cliente = await prisma.cliente.findUnique({
      where: { id: payload.sub },
    });
    if (!cliente)
      return res.status(404).json({ message: "Usuário não encontrado." });
    else if (cliente.adm) next();
    else res.status(401).json({ error: "Sem autorização" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export { adm };
