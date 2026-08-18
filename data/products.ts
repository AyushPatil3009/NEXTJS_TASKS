// export const products = [
//   {
//     id: 1,
//     name: "NovaHome Hub",
//     category: "smart-home",
//     description: "Control your smart home devices from one place.",
//     price: 9999,
//   },
//   {
//     id: 2,
//     name: "NovaSecure Cam",
//     category: "security",
//     description: "Smart security camera with real-time monitoring.",
//     price: 6999,
//   },
//   {
//     id: 3,
//     name: "NovaLight",
//     category: "lighting",
//     description: "Smart LED lighting with app control.",
//     price: 2999,
//   },
//   {
//     id: 4,
//     name: "NovaSpeaker",
//     category: "audio",
//     description: "Smart speaker with voice control.",
//     price: 4999,
//   },
// ];

export async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}