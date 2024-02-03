import { Router } from "express";
const router = Router();

import ClienteController from "../controllers/ClienteController";
import ProdutoController from "../controllers/ProdutoController";
import CompraController from "../controllers/CompraController";
import AuthController from "../controllers/AuthController";
import {
  validatorCliente,
  validatorCompra,
  validatorProduto,
} from "../config/validator";
import { adm } from "../middlewares/adm";

router.post("/login", AuthController.login);
router.get("/user", AuthController.getDetails);

router.post(
  "/cliente",
  validatorCliente("createCliente")!,
  ClienteController.createUser
);
router.get("/cliente", adm, ClienteController.getAllUsers);
router.get("/cliente/:id", adm, ClienteController.getUser);
router.put("/cliente/:id", adm, ClienteController.updateUser);
router.delete("/cliente/:id", adm, ClienteController.deleteUser);

router.post(
  "/produto",
  adm,
  validatorProduto("createProduto")!,
  ProdutoController.createProduto
);
router.get("/produto", ProdutoController.getAllProdutos);
router.get("/produto/:id", ProdutoController.getProduto);
router.put("/produto/:id", adm, ProdutoController.updateProduto);
router.delete("/produto/:id", adm, ProdutoController.deleteProduto);

router.post(
  "/compra",
  validatorCompra("createCompra")!,
  CompraController.comprar
);
router.get("/compra", adm, CompraController.compras);
router.delete("/compra/:id", adm, CompraController.delete);

export default router;
