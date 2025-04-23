
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ResourcesSection } from "@/components/ResourcesSection";

export default function Resources() {
  return (
    <div className="font-poppins min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <ResourcesSection />
      </main>
      <Footer />
    </div>
  );
}
