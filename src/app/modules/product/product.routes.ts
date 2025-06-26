import express from "express";
import { ProductControllers } from "./product.controllers";

const router = express.Router();

router.get('/arman', (req, res) => {
    res.send("Hello Arman")
});

router.post("/products", ProductControllers.createNewProduct);
// this router for both getting all products from db and getting all data based on query text
router.get('/products', ProductControllers.getAllProducts);
router.get("/products/:productId", ProductControllers.getSpecificProById);
router.patch("/products/:productId", ProductControllers.updateSpecificProByIdIntoDB);
router.delete("/products/:productId", ProductControllers.deleteProductById);



export default router;