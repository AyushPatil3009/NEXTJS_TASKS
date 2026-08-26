// "use client";

// import { useState } from "react";

// export default function AddToCart({
//   productId,
// }: {
//   productId: number;
// }) {
//   const [added, setAdded] = useState(false);

//   return (
//     <button onClick={() => setAdded(true)}>
//       {added ? "Added ✓" : "Add to Cart"}
//     </button>
//   );
// }

"use client";

import { useState } from "react";

type Props = {
  productId: number;
  productName: string;
  price: number;
};

export default function AddToCart({
  productId,
  productName,
  price,
}: Props) {
  const [added, setAdded] = useState(false);

  return (
    <div>
      <p>
        {productName} - ${price} Price
      </p>

      <button onClick={() => setAdded(true)}>
        {added ? "Added ✓" : "Add to Cart"}
      </button>
    </div>
  );
}