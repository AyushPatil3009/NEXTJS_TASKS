import Link from "next/link";
import { getProducts } from "@/data/products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse all products available at MyStore.",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-12">
        Our Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product: any) => (
          <div 
            key={product.id} 
            className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Image Container with white background so product images blend well */}
            <div className="h-64 bg-white p-6 flex items-center justify-center">
              <img 
                src={product.image} 
                alt={product.title} 
                className="max-h-full max-w-full object-contain mix-blend-multiply"
              />
            </div>
            
            {/* Card Content Container */}
            <div className="p-6 flex flex-col flex-grow border-t border-gray-100 dark:border-gray-700">
              <p className="text-xs text-indigo-500 uppercase tracking-widest font-bold mb-2">
                {product.category}
              </p>
              
              {/* line-clamp-2 ensures the title doesn't break the layout if it's too long */}
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2" title={product.title}>
                {product.title}
              </h2>
              
              <p className="text-2xl font-black text-gray-900 dark:text-white mb-6 mt-auto">
                ${product.price}
              </p>

              <Link 
                href={`/products/${product.id}`}
                className="w-full block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl transition-colors shadow-md hover:shadow-lg"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}