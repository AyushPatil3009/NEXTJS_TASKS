// "use server";

// export async function submitContact(formData: FormData) {
//   const name = formData.get("name")?.toString().trim();
//   const email = formData.get("email")?.toString().trim();
//   const message = formData.get("message")?.toString().trim();

//   if (!name || !email || !message) {
//     console.log("All fields are required");
//     return;
//   }

//   console.log({
//     name,
//     email,
//     message,
//   });
// }
// "use server";

// export async function submitContact(
//   prevState: { error?: string; success?: string },
//   formData: FormData
// ) {
//   const name = formData.get("name")?.toString().trim();
//   const email = formData.get("email")?.toString().trim();
//   const message = formData.get("message")?.toString().trim();

//   if (!name || !email || !message) {
//     return {
//       error: "All fields are required.",
//     };
//   }

//   return {
//     success: "Message sent successfully!",
//   };
// }

"use server";

export async function submitContact(
  prevState: { error?: string; success?: string },
  formData: FormData
) {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  if (!name || !email || !message) {
    return {
      error: "All fields are required.",
    };
  }

  // Simulate database/API operation
  await new Promise((resolve) => setTimeout(resolve, 1500));

  console.log({
    name,
    email,
    message,
  });

  return {
    success: "Message sent successfully!",
  };
}