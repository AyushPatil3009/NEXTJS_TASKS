import type { Metadata } from "next";
import { notFound } from "next/navigation";

import AddToCart from "@/app/components/AddToCart";

const products = [
  {
    id: 1,
    name: "iPhone 17",
    description: "Latest Apple smartphone.",
    title:"mobile",
    price: 95000
  },
  {
    id: 2,
    name: "Samsung S25",
    description: "Samsung flagship smartphone.",
    title: "mobile",
    price: 130000

  },
];

export async function generateMetadata({params,}: {params: Promise<{ id: string }>;}): Promise<Metadata> 
{
  const { id } = await params;

  const product = products.find(
    (product) => product.id === Number(id)
  );

  return {
    title: product ? product.name : "Product Not Found",
    description: product
      ? product.description
      : "The requested product does not exist.",
  };
}

export default async function ProductPage({params}: {params: Promise<{ id: string }>}) 
{
  const { id } = await params;
  const product = products.find(
    (product) => product.id === Number(id)
  );

  if(product)
  {
    return(
      <>
      <h2>Product ID: {product.id}</h2>
      <h2>Product Name:{product.name}</h2>
      <br></br>
      <h2>Now this below UI comes form Client Component</h2>
      <AddToCart
        productId={product.id}
        productName={product.title}
        price={product.price}
      />      
      </>
    )
  }
   if (!product) {
    notFound();
  }
}

