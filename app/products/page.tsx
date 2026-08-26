// import SearchBox from "./SearchBox";
import type { Metadata } from "next";
import ThemeButton from "../components/ThemeButton";
export const metadata: Metadata = {
  title: "Products",
  description: "Browse all products available at MyStore.",
};
// export default async function ProductsPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ search?: string }>;
// }) {
//   const { search } = await searchParams;

//   return (
//     <div>
//       <h1>Products</h1>

//       <SearchBox />

//       <p>Search: {search || "All Products"}</p>
//     </div>
//   );
// }
// import Link from "next/link";

// const products = [
//   { id: 1, name: "iPhone 17" },
//   { id: 2, name: "Samsung S25" },
//   { id: 3, name: "OnePlus 13" },
// ];

// export default function Products() {
//   return (
//     <div>
//       <h1>PRODUCTS PAGE CONTENT</h1>

//       {products.map((product) => (
//         <div key={product.id}>
//             <br></br>
//           <h2>{product.name}</h2>

//         {/* this line is imp that creates the destination dynamically. */}
//           <Link href={`/products/${product.id}`}>
//             View Product
//           </Link>
//         </div>
//       ))}

//         <br></br>
//         <hr></hr>
//         <Link href="/products?category=mobile">
//             Mobile Products
//         </Link>
//         <br></br>
//         <Link href="/products?category=laptop">
//             Laptop Products
//         </Link>
//     </div>
//   );
// }

// "use client";
// import { useRouter } from "next/navigation";
// async only can be done in server componnet
async function getProducts() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const res = await fetch("https://dummyjson.com/products");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function ProductsPage() {
  const data = await getProducts();

  return (
    <div>
      <h1 style={{color:"Red"}}>PRODUCTS PAGE CONTENT</h1>
      {data.products.map((product: any) => (
        <p key={product.id}>{product.title}</p>
      ))}
      <br />
      {/* ThemeProvider is defined in a completely different file, ThemeButton can access it because Products Page is inside the Provider in your Root Layout. */}
      <ThemeButton />
    </div>
  );
}
// export default function NavigationPage() {
//   const router = useRouter();

//   return (
//     <div>
//       <h1>Navigation Practice:</h1>

//       <button onClick={() => router.push("/products")}>
//         Push → Products
//       </button>
//       <br></br>
//       <button onClick={() => router.replace("/dashboard")}>
//         Replace → Dashboard
//       </button>
//       <br></br>

//       <button onClick={() => router.back()}>
//         Back
//       </button>
//       <br></br>

//       <button onClick={() => router.forward()}>
//         Forward
//       </button>
//       <br></br>

//       <button onClick={() => router.refresh()}>
//         Refresh
//       </button>
//       <br></br>
//     </div>
//   );
// }