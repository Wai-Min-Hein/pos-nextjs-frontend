

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex items-center justify-start gap-2">
        <h1>Side Bar</h1>

        {children}
    </section>
  );
}
