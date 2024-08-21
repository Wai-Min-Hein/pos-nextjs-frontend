import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"],variable: '--font-inter' });

const roboto = Roboto({subsets:["latin"], weight:["400", "500","700"],variable: '--font-roboto'})



export const metadata: Metadata = {
  title: "Ali Pos",
  description: "Your sale is our passion.",
  icons: {
    icon: '/images/favicon.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${roboto.variable}`}>{children}</body>
    </html>
  );
}
