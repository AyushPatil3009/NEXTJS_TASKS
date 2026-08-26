import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <nav>
      {/* Good: Instant transition */}
      <p>Using Link Tag</p>
      <Link href="/about">Go to About Page</Link> 

      <br></br><br></br>
      
      {/* Bad: Full page refresh */}
      <p>Using a tag</p>
      <a href="/about">Go to About Page</a> 
    </nav>
  );
}
