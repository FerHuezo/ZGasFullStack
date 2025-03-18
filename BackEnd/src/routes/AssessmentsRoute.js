import express from "express";
import asssessmentsController from "../controllers/assessmentsController.js"

const router = express.Router();

router.route("/")
    .post(asssessmentsController.postAssessment)
    .get(asssessmentsController.getAssessments)
router.route("/:id")
    .put(asssessmentsController.putAssessment)
    .delete(asssessmentsController.deleteAssessment)

export default router;