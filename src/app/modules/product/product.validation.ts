// validation/product.validation.ts
import { z } from "zod";

export const productVariantSchema = z.object({
  type: z.string({
    required_error: "Variant type is required",
  }),
  value: z.string({
    required_error: "Variant value is required",
  }),
});

export const inventorySchema = z.object({
  quantity: z.number({
    required_error: "Inventory quantity is required",
  }),
  inStock: z.boolean({
    required_error: "Inventory inStock status is required",
  }),
});

export const zodProValidationSchema = z.object({
  name: z.string({
    required_error: "Product name is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  price: z.number({
    required_error: "Price is required",
  }),
  category: z.string({
    required_error: "Category is required",
  }),
  tags: z.array(z.string()), //
  variants: z.array(productVariantSchema),
  inventory: inventorySchema,
});
