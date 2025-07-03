// Using 'use client' directive to enable client-side rendering for this page.
'use client';

// Importing ToastContainer and toast for displaying notifications.
import { ToastContainer, toast } from 'react-toastify';

// Importing CSS styles specific to this page.
import 'react-toastify/dist/ReactToastify.css';
import classes from './page.module.css';

// Importing Next.js Image component for optimized image rendering.
import Image from 'next/image';

// Importing assets for the login page.
import LoginImage from '@/assets/images/loginImage.jpg';
import TaskIcon from '@/assets/icons/TaskIcon.png';

// Importing the LoginSubmitForm component for handling form submission.
import LoginSubmitForm from '@/components/LoginSubmitForm';

// Importing React hooks and custom hooks for managing state and actions.
import { useState, useEffect, useActionState, use } from 'react';

// Importing the Login service for authentication.
import { Login } from '@/services/AuthServices';

// Importing Next.js navigation utilities for redirecting users.
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';

// LoginPage component handles the login functionality and UI.
export default function LoginPage() {
  const router = useRouter(); // Hook for programmatic navigation.
  const [errorMessage, setErrorMessage] = useState(''); // State for storing error messages.

  // Using useActionState to manage the login action and its state.
  const [state, formAction] = useActionState(Login, { result: false, token: '', message: '' });

  // useEffect hook to handle side effects based on the login state.
  useEffect(() => {
    if (state.result && state.token) {
      localStorage.setItem('token', state.token); // Storing the token in localStorage.
      console.log('Token stored in localStorage:', state.token);

      // Displaying a success toast notification and redirecting to the dashboard.
      toast.success("Login successful! Redirecting to dashboard page", {
        position: "top-left",
        autoClose: 3000, // milliseconds
      });
      setTimeout(() => {
        redirect('/dashboard'); // Redirect to dashboard after login.
      }, 3000); // Redirect after 3 seconds.
    } else if (state.status === 'fail') {
      // Displaying an error toast notification for failed login.
      toast.error(state.message, {
        position: "top-left",
        autoClose: 3000, // milliseconds
      });
    }
  }, [state]);

  return (
    <div className={classes.loginContainer}> {/* Main container for the login page layout. */}
      <ToastContainer /> {/* Container for displaying toast notifications. */}
      <div className={classes.inputContainer}> {/* Container for the input fields and form. */}
        <div className={classes.inputInner}> {/* Inner container for form elements. */}
          <div className={classes.appNameContainer}> {/* Container for the app name and logo. */}
            <Image
              src={TaskIcon} // Icon representing tasks.
              alt="Task Icon" // Alternative text for accessibility.
              width={30}
              height={30}
              className={classes.appLogo} // CSS class for styling the logo.
            />
            <p className={classes.appName}>Todo App</p> {/* App name displayed next to the logo. */}
          </div>

          <p className={classes.welcomeText}> {/* Welcome text for the user. */}
            Holla,<br />Welcome Back
          </p>

          <p className={classes.welcomeTextSmall}> {/* Smaller welcome text for additional context. */}
            Hey, welcome back to your special place!
          </p>

          <form className={classes.form} action={formAction}> {/* Login form with action handler. */}
            <input
              name="username"
              type="text"
              placeholder="Username"
              className={classes.input} // CSS class for styling the input field.
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className={classes.input} // CSS class for styling the input field.
              required
            />
            <button
              type="button"
              className={classes.forgotPasswordButton} // CSS class for styling the forgot password button.
            >
              Forgot Password?
            </button>
            <p className={classes.errorMessage}>{errorMessage}</p> {/* Displaying error messages. */}
            <LoginSubmitForm /> {/* Component for handling form submission. */}
          </form>

          <p className={classes.signUpPrompt}> {/* Prompt for users to sign up if they don't have an account. */}
            Don&apos;t have an account?{' '}
            <button
              type="button"
              className={classes.signUpButton} // CSS class for styling the sign-up button.
              onClick={() => router.push('/signup')} // Redirecting to the sign-up page.
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
      <div className={classes.imageContainer}> {/* Container for the login page image. */}
        <Image
          src={LoginImage} // Image displayed on the login page.
          alt="Login" // Alternative text for accessibility.
          className={classes.image} // CSS class for styling the image.
          fill
          style={{ objectFit: 'cover' }} // Ensuring the image covers the container.
        />
      </div>
    </div>
  );
}
