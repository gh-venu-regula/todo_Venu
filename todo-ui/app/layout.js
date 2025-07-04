// This file defines the root layout for the Next.js application.
// Importing the DashboardHeader component for displaying the header section of the dashboard.
import DashboardHeader from "@/components/dashboard/DashboardHeader";

// Importing global CSS styles for consistent styling across the application.
import "./globals.css";

// Metadata object containing the title and description of the application.
export const metadata = {
  title: "Create Next App", // Title of the application.
  description: "Generated by create next app", // Description of the application.
};

// RootLayout component serves as the main layout wrapper for the application.
export default function RootLayout({ children }) {
  return (
    <html lang="en"> 
      <body className='bodyClass'>
        {children}
      </body>
    </html>
  );
}
