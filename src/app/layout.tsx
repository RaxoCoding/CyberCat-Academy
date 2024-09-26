import "@/styles/globals.css";
import React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/sonner";
import { NavBar } from "@/components/specific/NavBar";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

export const metadata: Metadata = {
  title: "CyberCat Academy",
  description: "Enhance your cybersecurity skills with Cyber Cat Challenges",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark">
      <ReactQueryProvider>
        <NavBar />
        <main className="bg-background text-foreground p-8">{children}</main>
      </ReactQueryProvider>
      <Analytics />
      <SpeedInsights />
      <Toaster richColors />
      </body>
    </html>
  );
}
