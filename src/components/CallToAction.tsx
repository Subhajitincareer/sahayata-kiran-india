
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

export function CallToAction() {
  return (
    <section className="py-16 bg-gradient-to-r from-sahayata-blue/10 to-sahayata-purple/20">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-poppins mb-4">Join Us in Creating a Supportive Community</h2>
          <p className="text-sahayata-neutralGray max-w-2xl mx-auto">
            Together we can build a mentally healthier student community. Register to access all resources and support options.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-full bg-sahayata-blue/20 p-2">
                <ShieldCheck className="h-5 w-5 text-sahayata-blue" />
              </div>
              <h3 className="font-semibold">Your privacy is protected</h3>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Create an anonymous account to access all resources, track your progress, and connect with support communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="bg-sahayata-blue hover:bg-sahayata-blue/80 flex-1">
                Register Now
              </Button>
              <Button variant="outline" size="lg" className="flex-1">
                Learn More
              </Button>
            </div>
            <p className="text-xs text-center text-sahayata-neutralGray mt-4">
              For schools and NGOs: <a href="/institutions" className="text-sahayata-blue underline">Register your institution</a>
            </p>
          </div>
        </div>
        
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-2">
            <p className="text-3xl font-bold text-sahayata-blue">24/7</p>
            <p className="text-sm text-sahayata-neutralGray">Support Available</p>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-sahayata-blue">100%</p>
            <p className="text-sm text-sahayata-neutralGray">Anonymous</p>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-sahayata-blue">50+</p>
            <p className="text-sm text-sahayata-neutralGray">Professional Counselors</p>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-sahayata-blue">10K+</p>
            <p className="text-sm text-sahayata-neutralGray">Students Supported</p>
          </div>
        </div>
      </div>
    </section>
  );
}
