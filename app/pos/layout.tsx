"use client";

import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="px-6 pb-6">{children}</main>;
}
