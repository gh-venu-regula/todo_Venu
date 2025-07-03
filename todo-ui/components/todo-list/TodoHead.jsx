import classes from './TodoHead.module.css';
export default function TodoHead({ isCompleted }) {
    return (
        <div 
        className={isCompleted ? `${classes.todoHead} ${classes.completed}` :
         `${classes.todoHead} ${classes.pending}` }>
            <div className={classes.whiteDot}>
                <div
                    className={isCompleted ? classes.completedDot : classes.pendingDot}
                ></div>
            </div>
            <p
                className={isCompleted ? classes.completedText : classes.pendingText}>
                {isCompleted ? 'Completed' : 'Pending'}
            </p>
        </div>
    );
}
