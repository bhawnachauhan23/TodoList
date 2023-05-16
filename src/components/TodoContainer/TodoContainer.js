import { useEffect, useState } from "react";
import { Store } from "react-notifications-component";

// importing all files
import {
  addTaskHandler,
  deleteTask,
  fetchTodo,
  updateTask
} from "../../api/index";

import AddTask from "../AddTask/AddTask";
import Spinner from "../Spinner/Spinner";
import ShowTask from "../ShowTask/ShowTask";

// importing corresponding css
import "./TodoContainer.css";

// importing bootstrap css
import "react-notifications-component/dist/theme.css";

// Creating functional component as Todo Container
function TodoContainer() {
  // setting up loading state
  const [isloading, setisLoading] = useState(true);

  // setting up id manually
  const [id, setId] = useState(201);
  // setting up todo state
  const [Todo, setTodo] = useState([]);

  // setting up editing state
  const [isEdit, setisEdit] = useState({
    edit: false,
    task: {}
  });

  // setting up the userId
  const userId = 1;

  // making a notifications object for react notifications
  const notifications = {
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 4000,
      onScreen: true
    }
  };

  // using a useEffect hook for fetching and getting all the todo after the component renders
  useEffect(() => {
    async function post() {
      Store.addNotification({
        title: "In Progress",
        message: "fetching Data",
        type: "info",
        ...notifications
      });

      const data = await fetchTodo();

      if (data.success) {
        setisLoading(false);
        setTodo(data.data);
      } else {
        setisLoading(false);
        Store.addNotification({
          title: "Sorry",
          message: data.message,
          type: "error",
          ...notifications
        });
      }
    }
    post();
  }, []);

  // adding a functionality of competing a task
  async function completed(task) {
    const index = Todo.findIndex((elem) => {
      return elem.id === task.id;
    });

    setTodo((prev) => {
      prev[index].completed = true;
      return [...prev];
    });

    // setting up notifications
    Store.addNotification({
      title: "Congrats",
      message: "Task Completed Successfully",
      type: "success",
      ...notifications
    });
  }

  // setting up function for updating the task
  async function updateHandler(task, requested) {
    if (requested) {
      setisEdit({
        edit: true,
        task
      });

      return;
    }

    Store.addNotification({
      title: "In Progress",
      message: "updating data",
      type: "info",
      ...notifications
    });

    const data = await updateTask(task);
    if (data.success) {
      Store.addNotification({
        title: "Hurry",
        message: "Task updated Successfully",
        type: "success",
        ...notifications
      });
    } else {
      Store.addNotification({
        title: "Ops!",
        message: data.message,
        type: "error",
        ...notifications
      });
    }

    setisEdit({
      edit: false,
      task: {}
    });
  }

  // setting up functions for deleting a particular task
  async function deleteHandler(id) {
    Store.addNotification({
      title: "In Progress",
      message: "Deleting Data",
      type: "info",
      ...notifications
    });

    const result = await deleteTask(id);

    if (result.success) {
      const todo = Todo.filter((data) => {
        return data.id !== id;
      });

      setTodo(todo);

      Store.addNotification({
        title: "Hurry",
        message: "Task Deleted Successfully",
        type: "success",
        ...notifications
      });
    } else {
      Store.addNotification({
        title: "Oops",
        message: result.message,
        type: "error",
        ...notifications
      });
    }
  }

  // adding functionality for adding a new todo task
  async function addData(title) {
    Store.addNotification({
      title: "In Progress",
      message: "Adding Data",
      type: "info",
      ...notifications
    });

    console.log(id);
    const data = await addTaskHandler(title, userId);

    if (data.success) {
      Store.addNotification({
        title: "Hurry",
        message: "Task Added Successfully",
        type: "success",
        ...notifications
      });

      // setting manual id to given element returned response
      data.data.id = id;
      setId(id + 1);

      setTodo([data.data, ...Todo]);
    } else {
      Store.addNotification({
        title: "Sorry",
        message: data.message,
        type: "error",
        ...notifications
      });
    }
  }

  return (
    // container of todo app
    <div className="Todocontainer">
      {/* Heading */}
      <h1 id="heading">TODO APP</h1>

      {/* component for adding a task */}
      <AddTask
        addtask={addData}
        isEdit={isEdit}
        updateHandler={updateHandler}
      />

      {/* component for rendering the tasks */}
      {isloading ? (
        <Spinner />
      ) : (
        <ShowTask
          todo={Todo}
          delete={deleteHandler}
          completed={completed}
          updateHandler={updateHandler}
        />
      )}
    </div>
  );
}

// exporting the component as default
export default TodoContainer;
