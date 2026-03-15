"use client";

import { ThemeProvider } from "next-themes";

 function ThemeProviderClient({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      enableSystem={false}
      attribute="class"
      defaultTheme="light"
    >
      {children}
    </ThemeProvider>
  );
}

export default ThemeProviderClient;