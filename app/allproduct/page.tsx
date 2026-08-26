import { products } from "../data/product";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <main>
      <h1>Products</h1>

      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <p>₹{product.price}</p>
        </div>
      ))}

      <Link style={{color: "Aqua", border:"2px Solid White", backgroundColor:"blue"}} href={"/add-product"}>Add To cart Page</Link>
    </main>
  );
}