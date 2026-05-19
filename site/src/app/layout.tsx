import type { Metadata } from "next";
import "./globals.css";
import { Footer, Header } from "@/components/ui";

export const metadata: Metadata = {
  title: "Hazard Quantization Companion",
  description: "A static companion site for Computational Techniques for Disaster Scenario Selection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
