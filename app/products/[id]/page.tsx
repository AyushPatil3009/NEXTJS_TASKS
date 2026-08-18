import { notFound } from "next/navigation";
import type { Metadata } from "next";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  return {
    title: product ? product.title : "Product Not Found",
    description: product
      ? product.description
      : "The requested product does not exist.",
  };
}


type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `https://fakestoreapi.com/products/${id}`
    );

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch {
    return null;
  }
}

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProduct(id);

  if (!product) {
    notFound();
  }   

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          
          {/* Image Section */}
          <div className="md:w-1/2 p-8 md:p-16 bg-white flex items-center justify-center relative">
            <img
              src={product.image}
              alt={product.title}
              className="max-w-full max-h-[400px] object-contain mix-blend-multiply"
            />
          </div>

          {/* Details Section */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-700">
            <p className="text-sm text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-bold mb-3">
              {product.category}
            </p>
            
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
              {product.title}
            </h1>

            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-6">
              ${product.price}
            </h2>

            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="mt-auto">
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                Add to Cart
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}