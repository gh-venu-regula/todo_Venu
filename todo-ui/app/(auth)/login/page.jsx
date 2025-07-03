'use client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classes from './page.module.css';
import Image from 'next/image';
import LoginImage from '@/assets/images/loginImage.jpg';
import TaskIcon from '@/assets/icons/TaskIcon.png';
import LoginSubmitForm from '@/components/LoginSubmitForm';
import HandleLoginForm from '@/utils/HandleLoginForm';
import { useState, useEffect, useActionState, use } from 'react';
import { Login } from '@/services/AuthServices';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
export default function LoginPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [state, formAction] = useActionState(Login, { result: false, token: '', message: '' });
  useEffect(() => {
    if (state.result && state.token) {
      localStorage.setItem('token', state.token);
      console.log('Token stored in localStorage:', state.token);
      toast.success("Login successful! Redirecting to dashboard  page", {
      position: "top-left",
      autoClose: 3000, // milliseconds
    });
    setTimeout(() => {
      redirect('/dashboard'); // Redirect to dashboard after login
    }, 3000); // Redirect after 3 seconds
    }else if (state.message === 'fail') {
      toast.error("Login failed. Please check your credentials.", {
        position: "top-left",
        autoClose: 3000, // milliseconds
      });
    }
  }, [state]);

  return (
    <div className={classes.loginContainer}>
      <ToastContainer />
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
            Holla,<br />Welcome Back
          </p>

          <p className={classes.welcomeTextSmall}>
            Hey, welcome back to your special place!
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
            <button
              type="button"
              className={classes.forgotPasswordButton}
            >
              Forgot Password?
            </button>
            <p className={classes.errorMessage}>{errorMessage}</p>
            <LoginSubmitForm />
          </form>

          <p className={classes.signUpPrompt}>
            Don&apos;t have an account?{' '}
            <button
              type="button"
              className={classes.signUpButton}
              onClick={() => router.push('/signup')}
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
      <div className={classes.imageContainer}>
        <Image
          src={LoginImage}
          alt="Login"
          className={classes.image}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  );
}
