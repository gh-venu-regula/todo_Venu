export async function GetTasks(token){
    //const tasks_url = process.env.BACKEND_URL+ "/api/task";
    const tasks_url="http://localhost:5000/api/task";
    
    return await fetch(tasks_url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then((response) => {
        if (!response.ok) {
            console.log("Network response was not ok", response.statusText);
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => {
        console.log("Tasks fetched successfully:", data);
        return { result: true, tasks: data.tasks };
    })
    .catch((error) => {
        console.error("Error fetching tasks:", error);
        return { result: false, tasks: null };
    });
}
export async function CreateTask(task) {
  const token = localStorage.getItem('token');
  const create_task_url = "http://localhost:5000/api/task";

  try {
    const res = await fetch(create_task_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        ...task,
        createdAt: new Date().toISOString(),
        isCompleted: false,
        isArchived: false
      })
    });

    if (!res.ok) throw new Error('Network error');
    const data = await res.json();
    return { success: true, data };
  } catch (err) {
    console.error('Error creating task:', err);
    return { success: false };
  }
}
export async function DeleteTask(id) {
  const url = `http://localhost:5000/api/task/${id}`;
  const token = localStorage.getItem('token');
  return fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function UpdateTask(data) {
  const url = `http://localhost:5000/api/task/${data.id}`;
  const token = localStorage.getItem('token');
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}