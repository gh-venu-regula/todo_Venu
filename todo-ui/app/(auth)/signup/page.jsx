'use client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classes from './page.module.css';
import Image from 'next/image';
import SignupImage from '@/assets/images/loginImage.jpg'; // Renamed for clarity
import TaskIcon from '@/assets/icons/TaskIcon.png';
import SignupSubmitForm from '@/components/SugnupSubmitForm';
import { useEffect ,useActionState} from 'react';
import { Signup } from '@/services/AuthServices';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
export default function SignupPage() {
  const router = useRouter();
  const [state, formAction] = useActionState(Signup, { result: false ,message:''});
  useEffect(() => {
    if (state.result) { 
      toast.success("Signup successful! Redirecting to Login page", {
        position: "top-left",
        autoClose: 3000, // milliseconds
      });
      setTimeout(() => {
        redirect('/login'); // Redirect to login page after signup
      }, 3000); // Redirect after 3 seconds
    }else if (state.message === 'fail') {
      toast.error("Signup failed. Something went wrong.", {
        position: "top-left",
        autoClose: 3000, // milliseconds
      });
    }
  }, [state]);
  return (
    <div className={classes.signupContainer}>
      <ToastContainer />
      {/* ToastContainer for notifications */}
      <div className={classes.inputContainer}>
        <div className={classes.inputInner}>
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

          <p className={classes.welcomeText}>
            Hello,<br />Create Account
          </p>

          <p className={classes.welcomeTextSmall}>
            Join us and start organizing your tasks!
          </p>

          <form className={classes.form} action={formAction}>
            <input
              name="username"
              type="text"
              placeholder="Username"
              className={classes.input}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className={classes.input}
              required
            />
           <SignupSubmitForm/>
          </form>

          <p className={classes.signupPrompt}>
            Already have an account?{' '}
            <button
              type="button"
              className={classes.signupLoginButtonLink}
              onClick={()=>router.push('/login')}
            >
              Login
            </button>
          </p>
        </div>
      </div>
      <div className={classes.imageContainer}>
        <Image
          src={SignupImage}
          alt="Signup"
          className={classes.image}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  );
}
