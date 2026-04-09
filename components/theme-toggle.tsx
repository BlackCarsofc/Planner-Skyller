"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      type="button"
      onClick={() => setDark((prev) => !prev)}
      className="rounded-2xl border border-rose-200 bg-white p-3"
      aria-label="Alternar tema"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
