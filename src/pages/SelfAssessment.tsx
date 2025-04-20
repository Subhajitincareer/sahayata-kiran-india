
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LanguageSelector } from "@/components/LanguageSelector";
import { SelfAssessmentSection } from "@/components/SelfAssessmentSection";

const SelfAssessment = () => {
  return (
    <div className="font-poppins">
      <Header />
      <main className="min-h-screen py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold font-poppins mb-4">Mental Health Self-Assessment</h1>
            <p className="text-sahayata-neutralGray max-w-2xl mx-auto">
              Take a confidential assessment to better understand your mental health and get personalized resources.
            </p>
          </div>
          <SelfAssessmentSection />
        </div>
      </main>
      <Footer />
      <LanguageSelector />
    </div>
  );
};

export default SelfAssessment;
