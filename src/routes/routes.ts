import { Router } from "express";
const router = Router();

import ClienteController from "../controllers/ClienteController";
import ProdutoController from "../controllers/ProdutoController";
import CompraController from "../controllers/CompraController";
import AuthController from "../controllers/AuthController";

router.post("/login", AuthController.login);
router.get("/user", AuthController.getDetails);

router.post("/cliente", ClienteController.createUser);
router.get("/cliente", ClienteController.getAllUsers);
router.get("/cliente/:id", ClienteController.getUser);
router.put("/cliente/:id", ClienteController.updateUser);
router.delete("/cliente/:id", ClienteController.deleteUser);

router.post("/produto", ProdutoController.createProduto);
router.get("/produto", ProdutoController.getAllProdutos);
router.get("/produto/:id", ProdutoController.getProduto);
router.put("/produto/:id", ProdutoController.updateProduto);
router.delete("/produto/:id", ProdutoController.deleteProduto);

router.post("/compra", CompraController.comprar);
router.get("/compra", CompraController.compras);
router.delete("/compra/:id", CompraController.delete);

export default router;
