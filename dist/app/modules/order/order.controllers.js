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
exports.OrderControllers = void 0;
const order_services_1 = require("./order.services");
const order_validation_1 = require("./order.validation");
// import { ProductModel } from "../product/product.model";
const createNewOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userGivenData = req.body;
        const result = order_validation_1.orderItemZodSchema.safeParse(userGivenData);
        // if there's order validation error by zod orderSchema
        if (!result.success) {
            res.status(400).json({
                success: false,
                message: "There's a validation err!",
                error: result.error.flatten(),
            });
            return;
        }
        const validatedOrderData = result.data;
        //   update the quantity and status of the matched product which has a _id that contains the order's productIdField's value
        const isUpdated = yield order_services_1.OrderServices.updateTheMatchedPro(validatedOrderData);
        if (!isUpdated) {
            res.status(400).json({
                success: false,
                message: "Insufficient quantity available in inventory",
            });
            return;
        }
        //   this code finally creating the order after updating the matched product
        const createdOrder = yield order_services_1.OrderServices.crateNewOrderIntoDB(validatedOrderData);
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: createdOrder,
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
// if there can be found userEmail as query then this func will find data based on that email inside if clause, otherwise it will fetch all the orders from db inside the else clause.
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req.query.email;
    try {
        // if the email exists
        if (userEmail) {
            const foundDocsByEmail = yield order_services_1.OrderServices.findOrdersByQueryEmailFromDB(userEmail);
            res.status(200).json({
                success: true,
                message: "Orders fetched successfully for user email!",
                data: foundDocsByEmail,
            });
        }
        else {
            //  if UserEmail doesn't exist
            const fetchedOrders = yield order_services_1.OrderServices.getAllOrdersFromDB();
            res.status(200).json({
                success: true,
                message: "Orders fetched successfully!",
                data: fetchedOrders,
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
exports.OrderControllers = {
    createNewOrder,
    getAllOrders,
};
