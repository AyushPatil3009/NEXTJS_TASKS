import { redirect } from "next/navigation";

function about_c()
{
    const role = "admin";

    if (role !== "admin") {
     redirect("/unauthorized");
    }
    
    return(
    <>
    <h1>Hello, Next.js! this is the About page</h1>
    <p>This is the About page content.</p>
    </>
    )
    
}
export default about_c;