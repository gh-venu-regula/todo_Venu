// This component displays informational text on the dashboard.
import classes from './DashboardInfo.module.css';

// The main functional component for Dashboard Info.
export default function DashboardInfo() {
    return (
        <div className={classes.dashboardInfo}> {/* Container for the dashboard information */}
            <p className={classes.plan}>Here’s your plan for the day.</p> {/* Informational text for the user */}
        </div>
    );
}
