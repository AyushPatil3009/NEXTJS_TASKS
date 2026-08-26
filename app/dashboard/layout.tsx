import Link from "next/link" 

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <nav style={{ backgroundColor: "Red" }}>My Dashboard Navbar</nav>
        {/* The current page's content gets injected here */}
        <main>{children}</main> 
        <br></br>
    </>
  );
}