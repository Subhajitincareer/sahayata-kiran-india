
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, MessageCircle, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CrisisHelplineSection() {
  const navigate = useNavigate();
  
  const handleCallNow = () => {
    // Direct call to helpline
    window.location.href = "tel:9152987821";
  };
  
  const handleTextSupport = () => {
    // Navigate to chat with "helpline" mode
    navigate("/chat", { state: { mode: "helpline" } });
  };

  return (
    <section className="py-16 bg-sahayata-softGray">
      <div className="container">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <span className="bg-sahayata-blue/20 p-2 rounded-full">
              <Phone className="h-6 w-6 text-sahayata-blue" />
            </span>
          </div>
          <h2 className="text-3xl font-bold font-poppins mb-4">24/7 Crisis Support</h2>
          <p className="text-sahayata-neutralGray max-w-2xl mx-auto">
            Immediate help is available whenever you need it. Our trained crisis counselors are just a call or message away.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="overflow-hidden border-0 shadow-lg">
            <div className="bg-sahayata-blue text-white p-6">
              <h3 className="text-xl font-bold mb-2">National Crisis Helpline</h3>
              <p className="opacity-90">Trained counselors available 24/7</p>
            </div>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-4 p-4 bg-sahayata-lightBlue/50 rounded-lg cursor-pointer" onClick={handleCallNow}>
                <div className="bg-white p-3 rounded-full shadow-sm">
                  <Phone className="h-6 w-6 text-sahayata-blue" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Crisis Helpline</p>
                  <p className="font-bold text-lg">9152987821</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-sahayata-purple/20 rounded-lg cursor-pointer" onClick={handleTextSupport}>
                <div className="bg-white p-3 rounded-full shadow-sm">
                  <MessageCircle className="h-6 w-6 text-sahayata-blue" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Text Support</p>
                  <p className="font-bold text-lg">Text HELP to 988</p>
                </div>
              </div>
              
              <div className="pt-2">
                <p className="text-sm text-gray-600 mb-4">
                  Professional counselors provide confidential emotional support for those in distress.
                </p>
                <Button className="w-full bg-sahayata-blue hover:bg-sahayata-blue/80" onClick={handleCallNow}>Call Now</Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-sahayata-lightBlue/50 p-2 rounded-full">
                  <Shield className="h-5 w-5 text-sahayata-blue" />
                </div>
                <h3 className="font-bold">Your Privacy Matters</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                All calls and chats are confidential and anonymous. Your information will not be shared without your consent.
              </p>
              <p className="text-xs text-sahayata-neutralGray">
                We adhere to strict confidentiality guidelines and protect your privacy at all times.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="font-bold mb-4">When to use the crisis helpline:</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 mt-0.5 rounded-full bg-sahayata-purple/20 flex items-center justify-center">
                    <span className="h-2.5 w-2.5 rounded-full bg-sahayata-blue"></span>
                  </div>
                  <span>When you're having thoughts of suicide or self-harm</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 mt-0.5 rounded-full bg-sahayata-purple/20 flex items-center justify-center">
                    <span className="h-2.5 w-2.5 rounded-full bg-sahayata-blue"></span>
                  </div>
                  <span>During overwhelming stress, anxiety or depression</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 mt-0.5 rounded-full bg-sahayata-purple/20 flex items-center justify-center">
                    <span className="h-2.5 w-2.5 rounded-full bg-sahayata-blue"></span>
                  </div>
                  <span>If you're concerned about a friend or family member</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 mt-0.5 rounded-full bg-sahayata-purple/20 flex items-center justify-center">
                    <span className="h-2.5 w-2.5 rounded-full bg-sahayata-blue"></span>
                  </div>
                  <span>When you need someone to talk to, anytime 24/7</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
