"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const product_model_1 = require("./product.model");
const createNewProductIntoDB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield product_model_1.ProductModel.create(product);
    return res;
});
const getAllProductsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const allProducts = product_model_1.ProductModel.find({});
    return allProducts;
});
const getSpecificProByIdFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.ProductModel.findById(productId);
    return product;
});
const updateProByIdIntoDB = (productId, updateInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findByIdAndUpdate(productId, updateInfo, {
        new: true, // returns the updated document
        runValidators: true, // runs schema validation
    });
    return result;
});
// product delete from db
const deleteProFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(productId);
    const res = yield product_model_1.ProductModel.findByIdAndDelete(productId);
    return res;
});
const findProductsByQueryTextFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const res = product_model_1.ProductModel.find({
        name: { $regex: searchTerm, $options: "i" },
    });
    return res;
});
// exporting the productServices
exports.ProductServices = {
    createNewProductIntoDB,
    getAllProductsFromDB,
    getSpecificProByIdFromDB,
    updateProByIdIntoDB,
    deleteProFromDB,
    findProductsByQueryTextFromDB,
};
