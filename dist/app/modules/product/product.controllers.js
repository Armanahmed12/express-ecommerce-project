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
exports.ProductControllers = void 0;
const product_services_1 = require("./product.services");
const product_validation_1 = require("./product.validation");
const createNewProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userGivenData = req.body;
        const result = product_validation_1.zodProValidationSchema.safeParse(userGivenData);
        // if there's validation error
        if (!result.success) {
            res.status(400).json({
                success: false,
                message: "There's a validation err!",
                error: result.error.flatten()
            });
            return;
        }
        const createdData = yield product_services_1.ProductServices.createNewProductIntoDB(result.data);
        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: createdData
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
            err: error
        });
    }
});
// if there can be found query searchTerm text then this func will find data based on that query searchTerm inside if clause, otherwise it will fetch all the data from db inside the else clause. 
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchTerm = req.query.searchTerm;
    try {
        // if there is searchTerm 
        if (searchTerm) {
            const foundDocsBySearchTerm = yield product_services_1.ProductServices.findProductsByQueryTextFromDB(searchTerm);
            res.status(200).json({
                success: true,
                message: "Products matching search term 'iphone' fetched successfully!",
                data: foundDocsBySearchTerm,
            });
        }
        else {
            //  if there is no searchTerm
            const result = yield product_services_1.ProductServices.getAllProductsFromDB();
            res.status(200).json({
                success: true,
                message: "Products fetched successfully!",
                data: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
            err: error,
        });
    }
});
const getSpecificProById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_services_1.ProductServices.getSpecificProByIdFromDB(req.params.productId);
        res.status(200).json({
            success: true,
            message: "Product fetched successfully!",
            data: result
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
            err: error,
        });
    }
});
// find product in mongodb and update that
const updateSpecificProByIdIntoDB = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const desiredUpdateInfo = req.body;
        console.log(productId, desiredUpdateInfo, "See the Info-");
        const updatedData = yield product_services_1.ProductServices.updateProByIdIntoDB(productId, desiredUpdateInfo);
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: updatedData,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
            err: error,
        });
    }
});
// find and delete product from db by its ID
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_services_1.ProductServices.deleteProFromDB(req.params.productId);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: null
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
            err: error,
        });
    }
});
// find docs with textQuery
const findProductsByQueryText = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const x = req.query;
    console.log(x);
});
exports.ProductControllers = {
    createNewProduct,
    getAllProducts,
    getSpecificProById,
    updateSpecificProByIdIntoDB,
    deleteProductById,
    findProductsByQueryText,
};
