
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Phone, MessageCircle, MapPin, Shield } from "lucide-react";
import { HelplineList } from "@/components/emergency/HelplineList";
import { NearbySupport } from "@/components/emergency/NearbySupport";
import { LiveChatSupport } from "@/components/emergency/LiveChatSupport";
import { SafetyCheckIn } from "@/components/emergency/SafetyCheckIn";
import { useIsMobile } from "@/hooks/use-mobile";

type EmergencyHelpPanelProps = {
  onClose: () => void;
};

export function EmergencyHelpPanel({ onClose }: EmergencyHelpPanelProps) {
  const isMobile = useIsMobile();
  const [language, setLanguage] = useState<"english" | "hindi">("english");
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Monitor online status for offline mode
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const translations = {
    english: {
      title: "Emergency Support",
      subtitle: "You are not alone. Help is available right now.",
      helplines: "Helplines",
      liveChat: "Live Chat",
      nearby: "Nearby Support",
      safetyCheck: "Safety Check-in",
      language: "भाषा: हिंदी",
      offlineMessage: "You're currently offline. Some features may be limited.",
    },
    hindi: {
      title: "आपातकालीन सहायता",
      subtitle: "आप अकेले नहीं हैं। सहायता अभी उपलब्ध है।",
      helplines: "हेल्पलाइन",
      liveChat: "लाइव चैट",
      nearby: "आस-पास की सहायता",
      safetyCheck: "सुरक्षा चेक-इन",
      language: "Language: English",
      offlineMessage: "आप वर्तमान में ऑफ़लाइन हैं। कुछ सुविधाएँ सीमित हो सकती हैं।",
    },
  };

  const t = translations[language];

  return (
    <div className="bg-white h-full flex flex-col">
      <div className="bg-red-50 px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-red-700">{t.title}</h2>
          <p className="text-sm text-red-600">{t.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(language === "english" ? "hindi" : "english")}
          >
            {t.language}
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-500">
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {!isOnline && (
        <div className="bg-amber-50 p-3 text-amber-800 text-sm border-b border-amber-200 flex items-center justify-center">
          <Shield className="h-4 w-4 mr-2" />
          {t.offlineMessage}
        </div>
      )}

      <Tabs defaultValue="helplines" className="flex-1 flex flex-col h-full">
        <div className="px-4 pt-2 border-b">
          <TabsList className="w-full justify-start gap-1">
            <TabsTrigger value="helplines" className="flex gap-1">
              <Phone className="h-4 w-4" /> {t.helplines}
            </TabsTrigger>
            {isOnline && (
              <>
                <TabsTrigger value="liveChat" className="flex gap-1">
                  <MessageCircle className="h-4 w-4" /> {t.liveChat}
                </TabsTrigger>
                <TabsTrigger value="nearby" className="flex gap-1">
                  <MapPin className="h-4 w-4" /> {t.nearby}
                </TabsTrigger>
              </>
            )}
            <TabsTrigger value="safetyCheck" className="flex gap-1">
              <Shield className="h-4 w-4" /> {t.safetyCheck}
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-y-auto pb-safe">
          <TabsContent value="helplines" className="m-0 h-full">
            <HelplineList language={language} />
          </TabsContent>
          {isOnline && (
            <>
              <TabsContent value="liveChat" className="m-0 h-full">
                <LiveChatSupport language={language} />
              </TabsContent>
              <TabsContent value="nearby" className="m-0 h-full">
                <NearbySupport language={language} />
              </TabsContent>
            </>
          )}
          <TabsContent value="safetyCheck" className="m-0 h-full">
            <SafetyCheckIn language={language} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
