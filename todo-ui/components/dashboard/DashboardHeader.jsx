// This component renders the header section of the dashboard.
import classes from './DashboardHeader.module.css';
import Image from 'next/image';

// Importing the task icon image for the app logo.
import TaskIcon from '@/assets/icons/TaskIcon.png'; // Ensure the path is correct

// The main functional component for the Dashboard Header.
export default function DashboardHeader() {
  return (
    <header className="dashboard-header"> {/* Container for the dashboard header */}
      <div className={classes.appNameContainer}> {/* Container for the app name and logo */}
        <Image
          src={TaskIcon} /* Path to the task icon image */
          alt="Task Icon" /* Alternative text for the image */
          width={30} /* Width of the image */
          height={30} /* Height of the image */
          className={classes.appLogo} /* Styling for the app logo */
        />
        <p className={classes.appName}>Todo App</p> {/* App name displayed next to the logo */}
      </div>
    </header>
  );
}