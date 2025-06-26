"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controllers_1 = require("./product.controllers");
const router = express_1.default.Router();
// this router for both getting all products from db and getting all data based on query text
router.get('/', product_controllers_1.ProductControllers.getAllProducts);
router.post("/", product_controllers_1.ProductControllers.createNewProduct);
router.get("/:productId", product_controllers_1.ProductControllers.getSpecificProById);
router.patch("/:productId", product_controllers_1.ProductControllers.updateSpecificProByIdIntoDB);
router.delete("/:productId", product_controllers_1.ProductControllers.deleteProductById);
exports.default = router;
