import { useState } from "react";
import TaskList from "./TaskList";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useAxiosPrivate from "../hooks/useAxiosPrivate";


const AddTask = () => {
  const [title, setTitle] = useState("");
  const [taskList, setTaskList] = useState(null);

  const request = useAxiosPrivate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await request.post(`/task`, { title });
    console.log("response: ", response);
    const data = await response.data;
    console.log("data.data: ", data.data);
    if (data.success) {
      toast.success("Task created!!");
      fetchTaskList();
      setTitle("");
    }
  };

  const fetchTaskList = async () => {
    console.log("fetch task list function ran")
    const response = await request.get(`/task`);
    const data = await response.data;
    if (data.success) {
      setTaskList(data.data);
    }
  };
  useEffect(() => {
    fetchTaskList();
  }, []);

  const deleteTask = async (id) => {
    const response = await request.delete(`/task/${id}`);
    const data = response.data;

    if (data.success) {
      toast.success("Deleted from db");
      const newList = taskList.filter((task) => task.id !== id);
      // console.log("new list", newList);
      setTaskList(newList);
    }
  };

  return (
    <div className=" grid place-items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow w-10/12 mt-8"
      >
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium">
            Title
          </label>
          <input
            type="text"
            className="border p-2 w-full rounded mt-1"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </form>
      <hr className="w-8/12 h-[1px] mx-auto bg-gray-300 border-0 rounded md:my-10" />
      <div className="grid place-items-center w-full">
        {taskList !== null &&
          taskList.map((task) => {
            return (
              <div key={task?.id} className=" w-10/12">
                <TaskList task={task} deleteTask={deleteTask} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AddTask;
