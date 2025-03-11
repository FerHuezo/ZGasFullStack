import express from "express";
import employeesController from "../controllers/productsController.js"

const router = express.Router();

router.route("/")
    .post(employeesController.postEmployees)
    .get(employeesController.getEmployees)
router.route("/:id")
    .put(employeesController.putEmployees)
    .delete(employeesController.deleteEmployees)

export default router;