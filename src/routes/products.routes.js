import router from "express";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/products.controller.js";
import { authRequired } from "../middlewares/valIdateToken.js";

export const productsRouter = router();

productsRouter.get("/", getProducts);
productsRouter.get("/:id", getProductById);
productsRouter.post("/", authRequired, createProduct);
productsRouter.patch("/:id", authRequired, updateProduct);
productsRouter.delete("/:id", authRequired, deleteProduct);

