import express from "express";
import branchesController from "../controllers/branchesController"

const router = express.Router();

router.route("/")
    .get(branchesController.getBranches)
    .post(branchesController.postBranch)
router.route("/:id")
    .put(branchesController.putBranch)
    .delete(branchesController.deleteBranch)

export default router;