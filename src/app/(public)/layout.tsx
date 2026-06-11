import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { KakaoChannelButton } from "@/components/KakaoChannelButton";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <KakaoChannelButton className="fixed right-4 bottom-4 z-50 rounded-full bg-(--color-primary) px-4 py-3 text-(--color-primary-foreground) shadow-lg" />
    </>
  );
}
