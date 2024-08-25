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

        {children}
    </main>
  );
}
