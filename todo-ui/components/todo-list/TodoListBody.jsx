// React component for rendering the body of the todo list
import TodoHead from './TodoHead'; // Component for rendering the header of a todo item
import TodoContent from './TodoContent'; // Component for rendering the content of a todo item
import classes from './TodoListBody.module.css'; // Import CSS module for styling

export default function TodoListBody({ isTasksLoaded, filteredTodos, fetchTasks }) {
  return (
    // Main container for the todo list body
    <div className={classes.todoListBody}>
      {isTasksLoaded ? (
        // Map through the filtered todos and render each todo item
        filteredTodos.map(todo => (
          <div key={todo.id} className={classes.todoItem}>
            <TodoHead isCompleted={todo.isCompleted} /> {/* Render the header of the todo item */}
            <TodoContent todo={todo} fetchTasks={fetchTasks} /> {/* Render the content of the todo item */}
          </div>
        ))
      ) : (
        // Display a message when no tasks are available
        <div className={classes.noTasks}>No tasks available</div>
      )}
    </div>
  );
}