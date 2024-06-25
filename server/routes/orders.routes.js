import { Router } from "express";
import { placeOrders } from "../controllers/orders.js";
import { viewOrders } from "../controllers/orders.js";

const router  = Router();

router.post('/orders',placeOrders)
router.post('/orders/vieworder',viewOrders)

export default router;