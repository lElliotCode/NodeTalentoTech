import { ProductModel } from "../models/product.js";
import { validateProduct, validatePartialProduct } from "../schemas/product.js";

export const getProducts = async (req, res) => {
    try {
        const { category } = req.query;
        const products = await ProductModel.getAll(category ? { category } : {});
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await ProductModel.getById({ id });
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const createProduct = async (req, res) => {

    const result = validateProduct(req.body);

    if (!result.success) {
        return res.status(400).json({ message: JSON.parse(result.error.message) });
    }

    const newProduct = await ProductModel.create({input: result.data});
    res.json({ "Product added": newProduct })
}   

export const updateProduct = async (req, res) => {
    const result = validatePartialProduct(req.body);

    if (!result.success) {
        return res.status(400).json({ message: JSON.parse(result.error.message) });
    }
    const {id } = req.params;
    const updatedProduct = await ProductModel.update({ id, product: result.data });

    if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.json({ "Product updated": updatedProduct })
}

export const deleteProduct = async (req, res) => {
    const {id } = req.params;
    const deletedProduct = await ProductModel.delete(id);

    if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.json({ "Product deleted": deletedProduct })
}