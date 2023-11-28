import { Router } from "express";
import UserController from "../controllers/UserController.js";

const router = Router();
const usercontroller = new UserController();

router.post("/register", usercontroller.addUser)
router.post("/login", usercontroller.loginUser);
router.get('/token', usercontroller.getNewAccessToken);


export default router;