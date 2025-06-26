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
exports.OrderServices = void 0;
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
const crateNewOrderIntoDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield order_model_1.OrderItemModel.create(orderData);
    return res;
});
const getAllOrdersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const allProducts = order_model_1.OrderItemModel.find({});
    return allProducts;
});
const findOrdersByQueryEmailFromDB = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const res = order_model_1.OrderItemModel.find({
        email: { $regex: userEmail, $options: "i" },
    });
    return res;
});
// ==================== Update the quantity and status of the matched products by the order's productId Field's value and save again into DB======================= //
const updateTheMatchedPro = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.ProductModel.findById(order.productId);
    if (!product || product.inventory.quantity < order.quantity) {
        console.log("Falsy", order.quantity, product === null || product === void 0 ? void 0 : product.inventory);
        return false;
    }
    product.inventory.quantity -= order.quantity;
    product.inventory.inStock = product.inventory.quantity > 0;
    yield product.save();
    return true;
});
exports.OrderServices = {
    crateNewOrderIntoDB,
    getAllOrdersFromDB,
    findOrdersByQueryEmailFromDB,
    updateTheMatchedPro,
};
;
