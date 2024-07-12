import type { Metadata } from "next";

import Header from "@/components/Header";

import "./globals.css";

export const metadata: Metadata = {
  title: "Plan my trip",
  description: "A web app that gives you basic data on a few places",
};

type TProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: TProps) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
