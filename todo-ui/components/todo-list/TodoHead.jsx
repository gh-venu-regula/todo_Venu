// React component for rendering the header of a todo item
import classes from './TodoHead.module.css'; // Import CSS module for styling

export default function TodoHead({ isCompleted }) {
    return (
        // Container for the todo header
        // Applies different styles based on the completion status
        <div
            className={isCompleted ? `${classes.todoHead} ${classes.completed}` :
                `${classes.todoHead} ${classes.pending}`}>
            <div className={classes.whiteDot}> 
                <div
                    className={isCompleted ? classes.completedDot : classes.pendingDot} // Inner dot with dynamic styles
                ></div>
            </div>
            <p
                className={isCompleted ? classes.completedText : classes.pendingText}>
                {isCompleted ? 'Completed' : 'Pending'}
            </p>
        </div>
    );
}
