const reviewsController = {};
import reviewsModel from "../models/Reviews.js";

// Obtener todos los productos
reviewsController.getReviews = async (req, res) => {
    try {
        const reviews = await reviewsModel.find().populate("idClient");
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

// Crear un nuevo producto
reviewsController.postReviews = async (req, res) => {
    try {
        const { comment, rating, idClient } = req.body;
        const newReview = new reviewsModel({ comment, rating, idClient });
        await newReview.save();
        res.status(200).json({ message: "OK" });
    } catch (error) {
        res.status(400).json({ message: "Bad Request", error });
    }
};

// Actualizar un producto por ID
reviewsController.putReviews = async (req, res) => {
    try {
        const { comment, rating, idClient } = req.body;
        const updatedReview = await reviewsModel.findByIdAndUpdate(
            req.params.id,
            { comment, rating, idClient },
            { new: true, runValidators: true }
        );

        if (!updatedReview) {
            return res.status(404).json({ message: "Not Found" });
        }
        res.json({ message: "OK", updatedReview });
    } catch (error) {
        res.status(400).json({ message: "Bad Request", error });
    }
};

// Eliminar un producto por ID
reviewsController.deleteReviews = async (req, res) => {
    try {
        const deletedReview = await reviewsModel.findByIdAndDelete(req.params.id);
        if (!deletedReview) {
            return res.status(404).json({ message: "Not Found" });
        }
        res.json({ message: "OK" });
    } catch (error) {
        res.status(500).json({ message: "Bad Request", error });
    }
};

export default reviewsController;