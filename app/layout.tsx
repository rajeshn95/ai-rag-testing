import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RAG-Chat",
  description: "A beautiful, minimal RAG chat experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-dvh flex flex-col">
            <header className="sticky top-0 z-40 w-full h-14 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
              <div className="mx-auto w-full max-w-3xl px-4 h-full flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-md bg-gradient-to-br from-purple-500 via-fuchsia-500 to-cyan-400" />
                  <span className="text-sm font-semibold tracking-tight">RAG-Chat</span>
                </div>
                <ThemeToggle />
              </div>
            </header>
            <main className="bg-grid bg-fixed min-h-[calc(100dvh-56px)]">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
