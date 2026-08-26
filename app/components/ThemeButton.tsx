"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeButton() {
  const { dark, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
// Then put it somewhere in your Navbar or page.