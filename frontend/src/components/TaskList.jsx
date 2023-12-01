import request from "../api/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineDelete } from "react-icons/ai";

const TaskList = ({ task, deleteTask }) => {
  const [isChecked, setIsChecked] = useState(task.status || false);
  const handleChange = () => {
    setIsChecked(!isChecked);

    // update in the database
    updateTask();
  };

  const updateTask = async () => {
    const response = await request.put(`/task/${task.id}`, {
      status: !isChecked,
    });
    const data = response.data;

    if (data.success) {
      toast.success("Updated in db");
    }
  };

  const handleDelete = () => {
    const confirm = window.confirm("Do you want to delete the task ?");
    if (confirm) {
      deleteTask(task.id);
    }
  };

  return (
    <div className=" flex justify-between items-center w-full">
      <p
        className={`${
          isChecked && "line-through"
        } text-xl w-10/12 font-medium tracking-tighter`}
      >
        {task?.title}
      </p>
      <div className=" flex w-1/12 justify-between text-2xl gap-2">
        <input
          type="checkbox"
          id=""
          name=""
          className="  checked:bg-blue-500 transform scale-150 hover:cursor-pointer"
          checked={isChecked}
          onChange={handleChange}
        />
        <span
          onClick={handleDelete}
          className=" hover:text-red-600 hover:cursor-pointer transition-all "
        >
          <AiOutlineDelete />
        </span>
      </div>
    </div>
  );
};

export default TaskList;
