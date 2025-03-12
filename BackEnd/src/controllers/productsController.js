const productsController = {};
import productsModel from "../models/Products.js";

// Obtener todos los productos
productsController.getProducts = async (req, res) => {
    try {
        const products = await productsModel.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

// Crear un nuevo producto
productsController.postProducts = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;
        const newProduct = new productsModel({ name, description, price, stock });
        await newProduct.save();
        res.status(200).json({ message: "OK" });
    } catch (error) {
        res.status(400).json({ message: "Bad Request", error });
    }
};

// Actualizar un producto por ID
productsController.putProducts = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;
        const updatedProduct = await productsModel.findByIdAndUpdate(
            req.params.id,
            { name, description, price, stock },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Not Found" });
        }

        res.json({ message: "OK", updatedProduct });
    } catch (error) {
        res.status(400).json({ message: "Bad Request", error });
    }
};

// Eliminar un producto por ID
productsController.deleteProducts = async (req, res) => {
    try {
        const deletedProduct = await productsModel.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Not Found" });
        }

        res.json({ message: "OK" });
    } catch (error) {
        res.status(500).json({ message: "Bad Request", error });
    }
};

export default productsController;