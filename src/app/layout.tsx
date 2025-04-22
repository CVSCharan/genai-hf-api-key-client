import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Inter, Outfit } from "next/font/google";
import { TestimonialsProvider } from "@/contexts/TestimonialsContext";
import { DemoProvider } from "@/contexts/DemoContext";
import { ApiKeyModalProvider } from "@/contexts/ApiKeyModalContext";
import { DashboardProvider } from "@/contexts/DashboardContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "CVS GenAI Platform",
  description: "Unlock the power of GenAI with our platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased`}
      >
        <DashboardProvider>
          <ApiKeyModalProvider>
            <DemoProvider>
              <TestimonialsProvider>
                <AuthProvider>{children}</AuthProvider>
              </TestimonialsProvider>
            </DemoProvider>
          </ApiKeyModalProvider>
        </DashboardProvider>
      </body>
    </html>
  );
}
