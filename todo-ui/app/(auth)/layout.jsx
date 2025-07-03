export const metadata = {
  title: "Login Page",
  description: "Login to your account",
};

export default function AuthLayout({ children }) {
  return (
      <div className='authLayout'>
        {children}
      </div>
  );
}
