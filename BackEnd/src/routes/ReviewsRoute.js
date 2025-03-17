import express from "express";
import reviewsController from "../controllers/reviewsController.js"

const router = express.Router();

router.route("/")
    .post(reviewsController.postReviews)
    .get(reviewsController.getReviews)
router.route("/:id")
    .put(reviewsController.putReviews)
    .delete(reviewsController.deleteReviews)

export default router;