import TobBar from "@/components/TobBar";
import SideNav from "@/components/ui/sideNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="px-6">
      <TobBar/>
      <section className="flex items-start justify-start  ">
        <SideNav />

        {children}
      </section>
    </main>
  );
}
