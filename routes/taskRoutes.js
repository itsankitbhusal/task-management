import { Router } from "express";
import TaskController from "../controllers/TaskController.js";

const router = Router();
const taskController = new TaskController();


router.get("/", taskController.getAllTask);
router.post("/", taskController.createTask);
router.put("/:task_id", taskController.updateTask);
router.delete("/:task_id", taskController.deleteTask);

export default router;