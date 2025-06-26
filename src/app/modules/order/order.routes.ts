import express from 'express';
import { OrderControllers } from './order.controllers';


const router = express.Router();


router.post('/', OrderControllers.createNewOrder);
router.get("/", OrderControllers.getAllOrders);

export default router;