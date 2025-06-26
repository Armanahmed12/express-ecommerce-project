import express, { Application, Request, Response } from "express";
import cors from "cors";
import productRouter from "./app/modules/product/product.routes";
import orderRouter from "./app/modules/order/order.routes";
const app: Application = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// 404 handler (must be after all routes)
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});


export default app;
