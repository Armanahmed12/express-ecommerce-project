import express from "express";
import { ProductControllers } from "./product.controllers";

const router = express.Router();



// this router for both getting all products from db and getting all data based on query text
router.get('/', ProductControllers.getAllProducts);

router.post("/", ProductControllers.createNewProduct);
router.get("/:productId", ProductControllers.getSpecificProById);
router.patch("/:productId", ProductControllers.updateSpecificProByIdIntoDB);
router.delete("/:productId", ProductControllers.deleteProductById);



export default router;