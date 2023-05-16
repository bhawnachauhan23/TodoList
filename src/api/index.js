//storing api url into a variable
const url = "https://jsonplaceholder.typicode.com/todos";

// fetching all the todo's from todos API
export const fetchTodo = async function () {
  let data = [];
  try {
    const response = await fetch(url);
    data = await response.json();
    return {
      data, // Retrieved todos data
      success: true // Success status
    };
  } catch (error) {
    return {
      success: false, // Error status
      message: error.message // Error message
    };
  }
};

// function for creating new Task's
export const addTaskHandler = async function (title, userId) {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        title, // Task title
        userId, // User ID
        completed: false // Completion status
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    const data = await response.json();
    return {
      success: true, // Success status
      data // Created task data
    };
  } catch (error) {
    // catching an error
    return {
      success: false, // Error status
      message: error.message // Error message
    };
  }
};

// function for deleting a Task
export const deleteTask = async function (id) {
  try {
    const response = await fetch(url + `/${id}`, {
      method: "DELETE" // Request method
    });
    console.log(response);
    return {
      success: true // Success status
    };
  } catch (error) {
    return {
      success: false, // Error status
      message: error.message // Error message
    };
  }
};

// function for updating a Task
export const updateTask = async function (task) {
  try {
    const response = await fetch(url + `/${task.id}`, {
      method: "PUT",
      body: JSON.stringify(task), // Updated task object
      headers: {
        "Content-type": "application/json; charset=UTF-8" // Request header
      }
    });
    const data = await response.json();
    return {
      success: true, // Success status
      data // Updated task data
    };
  } catch (error) {
    return {
      success: false, // Error status
      message: error.message // Error message
    };
  }
};
