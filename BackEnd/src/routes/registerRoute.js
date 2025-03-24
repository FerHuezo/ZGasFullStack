import express from "express";
import RegisterController from "../controllers/registerController.js";

const router = express.Router();
router.route("/").post(RegisterController.postRegister)

export default router;