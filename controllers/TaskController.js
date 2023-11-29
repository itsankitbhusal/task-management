import models from "../models/index.js";
import { success, error } from "../utils/index.js";

class TaskController {
    // get all the task of the user
    getAllTask = async (req, res) => {
        try {
            const { id } = req.user;
            const tasks = await models.tasks.findAll({ where: { user_id: id } });
            return res.send(success(tasks))
        } catch (err) {
            return res.send(error(err.message));
        }
    }

    // create task
    createTask = async (req, res) => {
        const { id, username } = req.user;
        const { title } = req.body;

        if (title.length > 150) {
            return res.send(error("Task should be smaller than 150 chars!!"));
        }
        if (title.length < 4) {
            return res.send(error("Task should be greater than 4 chars!!"));
        }

        try {
            const task = await models.tasks.create({ title, user_id: id });
            return res.send(success(task));
        } catch (err) {
            return res.send(error(err.message));
        }
    }

    // update task as true/false
    updateTask = async (req, res) => {
        const { id, username } = req.user;
        const { task_id } = req.params;
        const { title, status } = req.body;

        if (!task_id) {
            return res.send(error('Missing id!'));
        }

        if (title) {
            if (title.length > 150) {
                return res.send(error("Task should be smaller than 150 chars!!"));
            }
            if (title.length < 4) {
                return res.send(error("Task should be greater than 4 chars!!"));
            }
        }
        try {
            const task = await models.tasks.findByPk(task_id);
            if (!task) {
                return res.send(error("Task not found on db!!"));
            }
            const updatedTask = await models.tasks.update(
                { title, status }, {
                where: { id: task_id }
            });
            console.log("updated task ", updatedTask)
            if (updatedTask) {
                return res.send(success(updatedTask));
            }
        } catch (err) {
            return res.send(error(err.message));
        }
    }

    // delete task
    deleteTask = async (req, res) => {
        const { task_id } = req.params;
        if (!task_id) {
            return res.send(error('Missing id!'));
        }
        try {
            const deletedTask = await models.tasks.destroy({ where: { id: task_id } });
            return res.send(success(deletedTask));
        } catch (err) {
            return res.send(error(err.message));
        }
    }
}

export default TaskController;