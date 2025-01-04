"use client";

import TobBar from "@/components/TobBar";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TobBar />
      <main className="px-6 pb-6">{children}</main>;
    </>
  );
}
