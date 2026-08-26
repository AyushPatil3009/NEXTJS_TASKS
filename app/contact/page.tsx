
// export default function ContactPage() {
//   return (
//     <main>
//       <h1>Contact NovaTech</h1>

//       <form action={submitContact}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Your name"
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Your email"
//         />

//         <textarea
//           name="message"
//           placeholder="Your message"
//         />

//         <button type="submit">
//           Send Message
//         </button>
//       </form>
//     </main>
//   );
// }

"use client";
import { submitContact } from "@/app/actions/contact";
import { useActionState } from "react";

import SubmitButton from "@/app/components/SubmitButton";



const initialState = {
  error: "",
  success: "",
};

export default function ContactPage() {
  const [state, formAction] = useActionState(submitContact,initialState);

  return (
    <main>
      <h1>Contact NovaTech</h1>

      <form action={formAction}>
        <input
          type="text"
          name="name"
          placeholder="Your name"
        />

        <input
          type="email"
          name="email"
          placeholder="Your email"
        />

        <textarea
          name="message"
          placeholder="Your message"
        />

        <SubmitButton/>
      </form>

      {state.error && <p>{state.error}</p>}

      {state.success && <p>{state.success}</p>}
    </main>
  );
}

{/* <form action={serverAction}>
            ↓
       Server Action
            ↓
         FormData
            ↓
        Validation
            ↓
      Database/API */}