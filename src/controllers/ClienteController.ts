import path from "path";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { Request, Response, request } from "express";
import auth from "../config/auth";
import filtrarDadosDoCliente from "../utils/filtrarDadosDoCliente";
import { readRenderHtml, transport } from "../config/mailer";
import handlebars from "handlebars";
import { validationResult } from "express-validator";

/* async function teste(req: Request, res: Response) {
  res.status(200).send("Funcionou");
} */

class ClienteController {
  async createUser(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }

      const { nome, cpf, email, senha, telefone, adm } = req.body;
      const { hash, salt } = auth.generatePassword(senha);

      const cliente = await prisma.cliente.create({
        data: { nome, cpf, email, telefone, hash, salt, adm },
      });

      // Envio do email de confirmação

      const pathTemplate = path.resolve(
        __dirname,
        "..",
        "..",
        "templates",
        "confirmacao.html"
      );
      readRenderHtml(pathTemplate, (htmlTemplate: any) => {
        const template = handlebars.compile(htmlTemplate);

        const replacements = {
          name: req.body.nome,
          message: "Bem vindo",
        };

        const htmlToSend = template(replacements);

        //Tentei fazer utilizando handlebars, mas por algum motivo o e-mail sempre era enviado sem corpo, mesmo dando ctrl+c, ctrl+v no código da aula
        const message = {
          from: process.env.MAIL_SENDER,
          to: req.body.email,
          subject: "Bem vindo",
          html: `<!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Document</title>
              <style>
              .container {
                width: 80%;
                aspect-ratio: 1/1;
                margin: 0 auto;
                padding-bottom: 2rem;
        
                background: #f2f3f3;
              }

              .image {
                width: 100%;
                display: flex;
              }

              .image img {
                margin: 0 auto;
              }
        
              .titulo {
                font-size: 2rem;
                font-weight: 700;
                text-align: center;
                color: #154962;
                margin: 0 auto 1rem
              }
        
              .paragrafo {
                font-size: 1.25rem;
                font-weight: 500;
                color: #263238;
                max-width: 50%;
                margin: 0 auto;
                text-align: center;
              }
            </style>
          </head>
          <body>
          <div class="container">
          <div class="image"><img src="https://i.ibb.co/WckP8Xd/logo.png" /></div>
          <h2 class="titulo">Olá, ${cliente.nome}</h2>
          <p class="paragrafo" class="">Ficamos felizes que você se juntou a nós.
            Sinta-se livre para navegar por nosso site e comprar produtos que o
            seu pet necessita pelo preço mais acessível do Brasil</p>
        </div>
          </body>
          </html>`,
        };

        //Enviando mensagem
        transport.sendMail(message, (error) => {
          if (error) throw error;
        });
      });

      //

      res.status(201).json(filtrarDadosDoCliente(cliente));
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const clientes = await prisma.cliente.findMany();
      res.status(200).json(clientes);
    } catch (error) {
      res.status(500).json({ error });
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
      res.status(500).json({ error });
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
      res.status(500).json({ error });
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
      res.status(500).json({ error });
    }
  }
}

export default new ClienteController();
