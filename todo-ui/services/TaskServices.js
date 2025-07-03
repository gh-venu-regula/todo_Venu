// Service function to fetch all tasks for the authenticated user
export async function GetTasks(token) {
  const tasks_url = "http://localhost:5000/api/task"; // Backend URL for fetching tasks

  return await fetch(tasks_url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` // Authorization header with JWT token
    }
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Network response was not ok", response.statusText); // Log error response
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Tasks fetched successfully:", data); // Log success response
      return { result: true, tasks: data.tasks }; // Return tasks data
    })
    .catch((error) => {
      console.error("Error fetching tasks:", error); // Log error response
      return { result: false, tasks: null }; // Return failure message
    });
}

// Service function to create a new task
export async function CreateTask(task) {
  const token = localStorage.getItem('token'); // Retrieve JWT token from local storage
  const create_task_url = "http://localhost:5000/api/task"; // Backend URL for creating tasks
  if (!token) {
   
    return { success: false, message: "No token found" }; // Return failure message
  }
  if(!task || !task.title || !task.description || !task.priority || !task.dueDate || !task.tags) {
    
    return { success: false, message: "Invalid task data" }; // Return failure message
  }
  if(task.title.length < 3 || task.description.length < 5) {
    
    return { success: false, message: "Title or description is too short" }; // Return failure message
  }
  if(task.priority < 1 || task.priority > 3) {
    
    return { success: false, message: "Priority must be between 1 and 3" }; // Return failure message
  }
  if(task.dueDate && new Date(task.dueDate) < new Date()) {
    
    return { success: false, message: "Due date cannot be in the past" }; // Return failure message

  }
  try {
    const res = await fetch(create_task_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}` // Authorization header with JWT token
      },
      body: JSON.stringify({
        ...task,
        createdAt: new Date().toISOString(), // Auto-set creation timestamp
        isCompleted: false, // Default value for completion status
        isArchived: false // Default value for archive status
      })
    });

    if (!res.ok) throw new Error('Network error');
    const data = await res.json();
    return { success: true, data }; // Return success response
  } catch (err) {
    console.error('Error creating task:', err); // Log error response
    return { success: false }; // Return failure message
  }
}

// Service function to delete a task by its ID
export async function DeleteTask(id) {
  const url = `http://localhost:5000/api/task/${id}`; // Backend URL for deleting tasks
  const token = localStorage.getItem('token'); // Retrieve JWT token from local storage
  return fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`, // Authorization header with JWT token
    },
  });
}

// Service function to update an existing task
export async function UpdateTask(data) {
  const url = `http://localhost:5000/api/task/${data.id}`; // Backend URL for updating tasks
  const token = localStorage.getItem('token'); // Retrieve JWT token from local storage
  if (!token) {
    return { success: false, message: "No token found" }; // Return failure message
  }
  if (data.title.length < 3 || data.description.length < 5) {
    return { success: false, message: "Title or description is too short" }; // Return failure message
  }
  if (data.priority < 1 || data.priority > 3) {
    return { success: false, message: "Priority must be between 1 and 3" }; // Return failure message
  }
  if (data.dueDate && new Date(data.dueDate) < new Date()) {
    return { success: false, message: "Due date cannot be in the past" }; // Return failure message
  }

  if (!data.id) {
    return { success: false, message: "Task ID is required" }; // Return failure message
  }
  if (data.isCompleted === undefined || data.isArchived === undefined) {
    return { success: false, message: "Completion and archive status are required" }; // Return failure message
  }
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}` // Authorization header with JWT token
    },
    body: JSON.stringify(data), // Send updated task data in request body
  });
}