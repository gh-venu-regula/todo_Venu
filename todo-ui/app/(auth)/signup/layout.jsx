export const metadata = {
  title: "SignUp Page",
  description: "Create a new account",
};

export default function SignupLayout({ children }) {
  return (
      <div className='signupLayout'>
        {children}
      </div>
  );
}
