const productsController = {}
import productsModel from "../models/Products.js";

productsController.getProducts = async (req, res) => {
    const products = await productsModel.find()
    res.json(products)
};

productsController.postProducts = async (req, res) => {
    const {name, description, price, stock} = req.body
    const newProduct = new productsModel({name, description, price, stock});
    await newProduct.save();
    res.json({message : "Product Saved :)"});
}

productsController.putProducts = async (req, res) => {
    const {name, description, price, stock} = req.body;
    const updatedProducts = await productsModel.findByIdAndUpdate(
        req.params.id,
        {name, description, price, stock},
        {new : true}
    );
    res.json({message : "Product Updated :)"})
}

productsController.deleteProducts = async (req, res) =>{
    await productsModel.findByIdAndDelete(req.params.id)
    res.json({message : "Product Deleted :)"})
}

export default productsController