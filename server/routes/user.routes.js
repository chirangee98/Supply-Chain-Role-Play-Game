import { Router } from "express";
 import { getGameDetails, logIn, placeOrder, showGames } from "../controllers/user.js";
 import { signUp } from "../controllers/user.js";
 import { fetchUser } from "../controllers/user.js";
// import { viewOrders } from "../controllers/orders.js";

const router  = Router();

router.post('/login',logIn);
router.post('/signup',signUp);
router.post('/fetchUser',fetchUser);
router.post('/showGames',showGames)
// router.post('/orders/vieworder',viewOrders)
router.get('/gameDetails/:gameid',getGameDetails)
router.post('/placeorder',placeOrder);

export default router;