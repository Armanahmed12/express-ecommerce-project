"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodProValidationSchema = exports.inventorySchema = exports.productVariantSchema = void 0;
// validation/product.validation.ts
const zod_1 = require("zod");
exports.productVariantSchema = zod_1.z.object({
    type: zod_1.z.string({
        required_error: "Variant type is required",
    }),
    value: zod_1.z.string({
        required_error: "Variant value is required",
    }),
});
exports.inventorySchema = zod_1.z.object({
    quantity: zod_1.z.number({
        required_error: "Inventory quantity is required",
    }),
    inStock: zod_1.z.boolean({
        required_error: "Inventory inStock status is required",
    }),
});
exports.zodProValidationSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "Product name is required",
    }),
    description: zod_1.z.string({
        required_error: "Description is required",
    }),
    price: zod_1.z.number({
        required_error: "Price is required",
    }),
    category: zod_1.z.string({
        required_error: "Category is required",
    }),
    tags: zod_1.z.array(zod_1.z.string()), //
    variants: zod_1.z.array(exports.productVariantSchema),
    inventory: exports.inventorySchema,
});
