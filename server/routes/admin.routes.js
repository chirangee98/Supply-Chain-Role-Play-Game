import { Router } from "express";
import { fetchUsers } from "../controllers/admin.js";
import { fetchGames } from "../controllers/admin.js";
import { Games } from "../controllers/admin.js";
import { updateStatus } from "../controllers/admin.js";
import { startGame } from "../controllers/admin.js";
import { allActiveUser } from "../controllers/admin.js";
import { gameDetails } from "../controllers/admin.js";
import { showGames } from "../controllers/admin.js";
const router  = Router();


router.get('/fetchUsers',fetchUsers);
router.post('/fetchgames',fetchGames);
router.post('/games',Games);
router.post('/updateStatus',updateStatus)
router.post('/startgame',startGame)
router.get('/allactiveuser',allActiveUser)
router.get('/gameDetails/:gameid',gameDetails)
router.post('/showGames',showGames)
// router.post('/orders/vieworder',viewOrders)

export default router;