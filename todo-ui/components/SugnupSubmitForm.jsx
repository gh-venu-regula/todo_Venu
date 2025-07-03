'use client';
import { useFormStatus } from "react-dom";
import classes from '@/app/(auth)/signup/page.module.css'
export default function SignupSubmitForm(){
    const status=useFormStatus();
    return(
        <button disabled={status.pending} className={classes.signupButtonMain}>
            {status.pending ? "Signing up..." : "Sign Up"}
        </button>
    );
}