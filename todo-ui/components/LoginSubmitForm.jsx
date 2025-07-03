// React component for the login submit button
'use client'; // Indicates that this component is rendered on the client side

import { useFormStatus } from "react-dom"; // Hook to track the form submission status
import classes from '@/app/(auth)/login/page.module.css'; // Import CSS module for styling

export default function LoginSubmitForm() {
    const status = useFormStatus(); // Tracks whether the form submission is pending

    return (
        // Button for submitting the login form
        // Disabled when the form submission is pending
        <button disabled={status.pending} className={classes.loginButton}>
            {status.pending ? "Logging in..." : "Log In"} 
        </button>
    );
}