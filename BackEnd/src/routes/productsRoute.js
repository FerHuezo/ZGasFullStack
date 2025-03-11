import express from "express";
import productsController from "../controllers/productsController.js"

const router = express.Router();

router.route("/")
    .post(productsController.postProducts)
    .get(productsController.getProducts)
router.route("/:id")
    .put(productsController.putProducts)
    .delete(productsController.deleteProducts)

export default router;