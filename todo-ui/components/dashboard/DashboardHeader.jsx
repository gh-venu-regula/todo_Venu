import classes from './DashboardHeader.module.css';
import Image from 'next/image'; 

import TaskIcon from '@/assets/icons/TaskIcon.png'; // Ensure the path is correct
export default function DashboardHeader() {
  return (
    <header className="dashboard-header">
     <div className={classes.appNameContainer}>
            <Image
              src={TaskIcon}
              alt="Task Icon"
              width={30}
              height={30}
              className={classes.appLogo}
            />
            <p className={classes.appName}>Todo App</p>
          </div>
    </header>
  );
}