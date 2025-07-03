// React component for the signup submit button
'use client'; // Indicates that this component is rendered on the client side

import { useFormStatus } from "react-dom"; // Hook to track the form submission status
import classes from '@/app/(auth)/signup/page.module.css'; // Import CSS module for styling

export default function SignupSubmitForm() {
    const status = useFormStatus(); // Tracks whether the form submission is pending

    return (
        // Button for submitting the signup form
        // Disabled when the form submission is pending
        <button disabled={status.pending} className={classes.signupButtonMain}>
            {status.pending ? "Signing up..." : "Sign Up"} 
        </button>
    );
}