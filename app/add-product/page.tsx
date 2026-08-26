import { addProduct } from "../actions/products";

export default function AddProductPage() {
  return (
    <main>
      <h1>Add Product</h1>

      <form action={addProduct}>
        <input
          name="title"
          placeholder="Product name"
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
        />

        <button type="submit">
          Add Product
        </button>
      </form>
    </main>
  );
}