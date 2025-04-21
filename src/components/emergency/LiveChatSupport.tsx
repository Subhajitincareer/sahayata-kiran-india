
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Clock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

type LiveChatSupportProps = {
  language: "english" | "hindi";
};

export function LiveChatSupport({ language }: LiveChatSupportProps) {
  const [connecting, setConnecting] = useState(false);
  const navigate = useNavigate();

  const translations = {
    english: {
      title: "Live Chat Support",
      description: "Connect with a trained counselor for immediate support",
      availableNow: "Available Now",
      connectNow: "Connect Now",
      connecting: "Connecting...",
      estimatedWait: "Estimated wait time:",
      minutesWait: "2-5 minutes",
      anonymousSupport: "Chat anonymously with a trained professional",
      confidential: "All conversations are confidential",
      counselorDetails: "Our counselors are trained in crisis intervention",
      offlineMessage: "Live chat is currently offline. Please try the helplines instead.",
    },
    hindi: {
      title: "लाइव चैट सहायता",
      description: "तत्काल सहायता के लिए एक प्रशिक्षित परामर्शदाता से जुड़ें",
      availableNow: "अभी उपलब्ध",
      connectNow: "अभी जुड़ें",
      connecting: "जुड़ रहे हैं...",
      estimatedWait: "अनुमानित प्रतीक्षा समय:",
      minutesWait: "2-5 मिनट",
      anonymousSupport: "एक प्रशिक्षित पेशेवर से अज्ञात रूप से चैट करें",
      confidential: "सभी वार्तालाप गोपनीय हैं",
      counselorDetails: "हमारे परामर्शदाता संकट हस्तक्षेप में प्रशिक्षित हैं",
      offlineMessage: "लाइव चैट वर्तमान में ऑफलाइन है। कृपया इसके बजाय हेल्पलाइनों का प्रयास करें।",
    }
  };

  const t = translations[language];

  const handleConnect = () => {
    setConnecting(true);
    setTimeout(() => {
      navigate("/chat", { state: { mode: "emergency" } });
    }, 1000);
  };
  
  // In a real app, this would come from an API
  const isLiveChatAvailable = true;

  return (
    <div className="p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-1">{t.title}</h3>
        <p className="text-sm text-gray-600">{t.description}</p>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-6 flex flex-col items-center">
          {isLiveChatAvailable ? (
            <>
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <MessageCircle className="h-8 w-8 text-green-600" />
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="font-medium">{t.availableNow}</span>
              </div>
              
              <div className="flex items-center gap-1 text-sm text-gray-600 mb-6">
                <Clock className="h-4 w-4" />
                <span>{t.estimatedWait} </span>
                <span className="font-medium">{t.minutesWait}</span>
              </div>
              
              <div className="mb-6 w-full space-y-3">
                <div className="flex gap-2 items-center">
                  <User className="h-4 w-4 text-sahayata-blue" />
                  <span className="text-sm">{t.anonymousSupport}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <MessageCircle className="h-4 w-4 text-sahayata-blue" />
                  <span className="text-sm">{t.counselorDetails}</span>
                </div>
              </div>
              
              <Button 
                onClick={handleConnect} 
                disabled={connecting}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {connecting ? t.connecting : t.connectNow}
              </Button>
            </>
          ) : (
            <div className="text-center py-8">
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">{t.offlineMessage}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
