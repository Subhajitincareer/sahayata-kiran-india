
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export function Hero() {
  const navigate = useNavigate();

  const handleChatHelpline = () => {
    navigate("/chat", { state: { mode: "helpline" } });
  };

  const handleAssessment = () => {
    navigate("/assessment");
  };

  return (
    <div className="bg-gradient-to-r from-sahayata-lightBlue to-sahayata-purple/30 min-h-[80vh] flex items-center justify-center">
      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* LEFT - Hero content */}
          <div className="space-y-6 md:space-y-8 animate-fade-in">
            <div className="inline-block bg-white/90 px-5 py-1.5 rounded-full shadow-md border border-sahayata-blue/10">
              <p className="text-sm font-medium text-sahayata-blue tracking-wide">
                You are not alone in this journey
              </p>
            </div>
            <h1 className="font-poppins text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight md:leading-tight text-gray-900">
              A{" "}
              <span className="text-sahayata-blue bg-gradient-to-r from-sahayata-blue via-[#9b87f5] to-sahayata-purple bg-clip-text text-transparent">
                ray of hope
              </span>
              <br className="hidden md:block" />
              for your mental well-being
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">
              Sahayata Kiran provides a safe space for students to seek help, connect with professionals, and find resources for mental health support.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="bg-sahayata-blue hover:bg-sahayata-blue/80 font-semibold text-lg px-8 py-3 shadow-md"
                onClick={handleAssessment}
              >
                Take Self-Assessment
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 font-semibold text-lg px-8 py-3 border-sahayata-blue/60 hover:border-sahayata-blue"
                onClick={handleChatHelpline}
              >
                <Phone className="h-5 w-5" />
                <span>Call Helpline</span>
              </Button>
            </div>
            <p className="text-sm text-gray-500 pt-2">
              In crisis?{" "}
              <Link
                to="/chat"
                state={{ mode: "emergency" }}
                className="text-sahayata-blue underline font-medium"
              >
                Get immediate help
              </Link>
            </p>
          </div>

          {/* RIGHT - Hero image */}
          <div className="hidden md:flex justify-center items-center w-full h-full relative">
            <img
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=500&q=80"
              alt="Students supporting each other"
              className="rounded-3xl shadow-xl object-cover w-full max-w-[480px] h-[390px] md:animate-fade-in"
              style={{
                border: "4px solid #E5DEFF",
                boxShadow: "0 6px 36px 0 rgba(51, 195, 240, 0.06)"
              }}
            />
            {/* Optional: Decorative accent */}
            <div className="absolute bottom-3 right-4 w-16 h-16 bg-sahayata-lightBlue rounded-full opacity-40 blur-2xl z-[-1]" />
          </div>
        </div>
      </div>
    </div>
  );
}
