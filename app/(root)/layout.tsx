import TobBar from "@/components/TobBar";
import SideNav from "@/components/ui/sideNav";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TobBar />

      <main className="px-6">
        <section className="flex items-start justify-start">
          <SideNav />
          <Toaster />
          {children}
        </section>
      </main>
    </>
  );
}
