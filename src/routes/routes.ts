import { Router } from "express";
const router = Router();

import ClienteController from "../controllers/Cliente";

router.post("/cliente", ClienteController.createUser);
router.get("/cliente", ClienteController.getAllUsers);
router.get("/cliente/:id", ClienteController.getUser);
router.put("/cliente/:id", ClienteController.updateUser);
router.delete("/cliente/:id", ClienteController.deleteUser);

export default router;
