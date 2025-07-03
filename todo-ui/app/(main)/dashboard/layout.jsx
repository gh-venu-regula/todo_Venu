import DashboardHeader from "@/components/dashboard/DashboardHeader";
export const metadata = {
  title: "Dashboard",
  description: "Dashboard for managing tasks",
};

export default function DashboardLayout({ children }) {
  return (
      <div className='dashboardLayout' style={{ marginLeft:'3rem' }}>
         <DashboardHeader/>
        {children}
      </div>
  );
}
