
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LanguageSelector } from "@/components/LanguageSelector";
import { AssessmentList } from "@/components/AssessmentList";

const AllAssessments = () => {
  return (
    <div className="font-poppins">
      <Header />
      <main className="min-h-screen py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold font-poppins mb-4">All Mental Health Assessments</h1>
            <p className="text-sahayata-neutralGray max-w-2xl mx-auto">
              Browse our comprehensive collection of scientifically validated assessment tools to better understand different aspects of your mental health.
            </p>
          </div>
          <AssessmentList />
        </div>
      </main>
      <Footer />
      <LanguageSelector />
    </div>
  );
};

export default AllAssessments;
