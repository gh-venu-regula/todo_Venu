import TodoHead from './TodoHead';
import TodoContent from './TodoContent';
import classes from './TodoListBody.module.css';

export default function TodoListBody({ isTasksLoaded, filteredTodos, fetchTasks }) {
  return (
    <div className={classes.todoListBody}>
      {isTasksLoaded ? (
        filteredTodos.map(todo => (
          <div key={todo.id} className={classes.todoItem}>
            <TodoHead isCompleted={todo.isCompleted} />
            <TodoContent todo={todo} fetchTasks={fetchTasks} />
          </div>
        ))
      ) : (
        <div className={classes.noTasks}>No tasks available</div>
      )}
    </div>
  );
}