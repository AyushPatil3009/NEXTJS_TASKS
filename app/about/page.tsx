import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about NovaTech, our mission, and our technology.",
};

export default function About() {
  return(
    <>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-12">ABOUT PAGE</h1>
        </main>
    </>
  )    

}