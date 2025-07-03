'use client';
import { useFormStatus } from "react-dom";
import classes from '@/app/(auth)/login/page.module.css'
export default function LoginSubmitForm(){
    const status=useFormStatus();
    return(
        <button disabled={status.pending} className={classes.loginButton}>
            {status.pending ? "Logging in..." : "Log In"}
        </button>
    );
}