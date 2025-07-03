import Image from 'next/image';
import classes from './TodoContent.module.css';
import LowPriority from '@/assets/icons/LowPriority.png';
import MediumPriority from '@/assets/icons/MediumPriority.png';
import HighPriority from '@/assets/icons/HighPriority.png';
import ThreeDots from '@/assets/icons/ThreeDots.png';
import DueDateIcon from '@/assets/icons/deadline.png';
import TodoActions from '@/components/modal/TodoActions';
export default function TodoContent({todo, fetchTasks}) {
  const bgcolors={"social":"green", "work": "orange", "personal": "blue", "other": "gray"};
  function formatDueDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const month = date.toLocaleString('default', { month: 'short' }); // 'Jul'
  const day = String(date.getDate()).padStart(2, '0'); // '05'
  return `${month}-${day}`;
}

  return (
    <div className={classes.todoContent}>
      <div className={classes.ContentHead}>
         <div 
         className={todo.priority ===1?`${classes.PriorityContainer} ${classes.LowPriorityContainer}`:
          todo.priority === 2?`${classes.PriorityContainer} ${classes.MediumPriorityContainer}`:
          `${classes.PriorityContainer} ${classes.HighPriorityContainer}`}
         >
            <Image
              src={todo.priority === 1?LowPriority: todo.priority === 2?MediumPriority:HighPriority}
              alt="Task Icon"
              width={15}
              height={15}
              className={classes.priorityLogo}
              title='Priority Icon'
              rotate={90}
            />
            <p 
            className={todo.priority === 1 ? classes.LowPriority : todo.priority === 2 ? classes.MediumPriority : classes.HighPriority}
            >
              {todo.priority === 1 ? 'Low' : todo.priority === 2 ? 'Medium' : 'High'}
            </p>
         </div>
         {/* <Image
           src={ThreeDots}
           alt="Three Dots Icon"
           width={20}
           height={20}
           className={classes.threeDots}
         /> */}
         <TodoActions todo={todo} fetchTasks={fetchTasks} />
      </div>
      <div className={classes.ContentBody}>
        <p className={classes.TodoTitle}>{todo.title}</p>
        <p className={classes.TodoDescription}>{todo.description}</p>
      </div>
      <div className={classes.ContentFooter}>
        <p className={classes.tag} style={{ backgroundColor: bgcolors[todo.tags] }}>{todo.tags}</p>
        <div className={classes.DueDateContainer}>
          <Image
            src={DueDateIcon}
            alt="Due Date Icon"
            width={15}
            height={15}
            className={classes.DueDateIcon}
          />
        <p className={classes.DueDate}>{formatDueDate(todo.dueDate)}</p>
        </div>
      </div>
    </div>
  );
}
