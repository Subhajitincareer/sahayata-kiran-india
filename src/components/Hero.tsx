
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <div className="bg-gradient-to-r from-sahayata-lightBlue to-sahayata-purple/30">
      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="inline-block bg-white px-4 py-1 rounded-full">
              <p className="text-sm font-medium text-sahayata-blue">
                You are not alone in this journey
              </p>
            </div>
            <h1 className="font-poppins text-3xl md:text-5xl font-bold tracking-tight">
              A <span className="text-sahayata-blue">ray of hope</span> for your mental well-being
            </h1>
            <p className="text-lg text-gray-600 max-w-md">
              Sahayata Kiran provides a safe space for students to seek help, connect with professionals, and find resources for mental health support.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="bg-sahayata-blue hover:bg-sahayata-blue/80">
                Take Self-Assessment
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Phone className="h-4 w-4" /> 
                <span>Call Helpline</span>
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              In crisis? <Link to="/crisis" className="text-sahayata-blue underline">Get immediate help</Link>
            </p>
          </div>
          <div className="hidden md:block">
            <img 
              src="/placeholder.svg" 
              alt="Students supporting each other" 
              className="rounded-lg shadow-lg object-cover h-[400px] w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
