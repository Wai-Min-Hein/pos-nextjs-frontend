import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import StoreProvider from "@/store/StoreProvider";
import StoreWrapper from "./StoreWrapper";
import TanStackProvider from "@/QueryProvider/TanStackProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Ali Pos",
  description: "Your sale is our passion.",
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${roboto.variable}`}>
        <StoreWrapper>
          <TanStackProvider>{children}</TanStackProvider>
        </StoreWrapper>
      </body>
    </html>
  );
}
