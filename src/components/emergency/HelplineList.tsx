
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type HelplineListProps = {
  language: "english" | "hindi";
};

// This data would ideally come from a backend API that's regularly updated
const helplines = [
  {
    name: { english: "iCall", hindi: "आई-कॉल" },
    description: { 
      english: "Psychosocial helpline by TISS",
      hindi: "टाटा इंस्टीट्यूट ऑफ सोशल साइंसेज द्वारा मनोसामाजिक हेल्पलाइन" 
    },
    phone: "9152987821",
    whatsapp: "9152987821",
    timings: { english: "Mon-Sat, 8am-10pm", hindi: "सोम-शनि, सुबह 8 - रात 10" },
    languages: { english: "English, Hindi, Marathi", hindi: "अंग्रेजी, हिंदी, मराठी" }
  },
  {
    name: { english: "AASRA", hindi: "आसरा" },
    description: { 
      english: "24x7 Helpline for Emotional Support & Suicide Prevention",
      hindi: "भावनात्मक समर्थन और आत्महत्या रोकथाम के लिए 24x7 हेल्पलाइन" 
    },
    phone: "9820466726",
    whatsapp: "",
    timings: { english: "24x7", hindi: "24x7" },
    languages: { english: "English, Hindi", hindi: "अंग्रेजी, हिंदी" }
  },
  {
    name: { english: "Vandrevala Foundation", hindi: "वांद्रेवाला फाउंडेशन" },
    description: { 
      english: "Mental Health Support & Crisis Intervention",
      hindi: "मानसिक स्वास्थ्य समर्थन और संकट हस्तक्षेप" 
    },
    phone: "9999666555",
    whatsapp: "9999666555",
    timings: { english: "24x7", hindi: "24x7" },
    languages: { english: "English, Hindi, Marathi, Gujarati", hindi: "अंग्रेजी, हिंदी, मराठी, गुजराती" }
  },
  {
    name: { english: "Snehi", hindi: "स्नेही" },
    description: { 
      english: "Counseling for Youth & Students",
      hindi: "युवाओं और छात्रों के लिए परामर्श" 
    },
    phone: "9582208181",
    whatsapp: "9582208181",
    timings: { english: "Daily 2pm-10pm", hindi: "रोज दोपहर 2 - रात 10" },
    languages: { english: "English, Hindi", hindi: "अंग्रेजी, हिंदी" }
  },
  {
    name: { english: "Lifeline Foundation", hindi: "लाइफलाइन फाउंडेशन" },
    description: { 
      english: "Suicide Prevention Helpline",
      hindi: "आत्महत्या रोकथाम हेल्पलाइन" 
    },
    phone: "9916821403",
    whatsapp: "",
    timings: { english: "10am-6pm", hindi: "सुबह 10 - शाम 6" },
    languages: { english: "English, Hindi, Regional", hindi: "अंग्रेजी, हिंदी, क्षेत्रीय भाषाएं" }
  }
];

// Handle calling a helpline number
const callHelpline = (phoneNumber: string) => {
  window.location.href = `tel:${phoneNumber}`;
};

// Handle opening WhatsApp
const openWhatsApp = (phoneNumber: string) => {
  window.open(`https://wa.me/${phoneNumber}`, "_blank");
};

export function HelplineList({ language }: HelplineListProps) {
  const translations = {
    english: {
      title: "Crisis Helplines",
      description: "These helplines are confidential, anonymous, and provide immediate support",
      call: "Call",
      message: "WhatsApp",
      availableAt: "Available",
      languages: "Languages",
      offlineAvailable: "Available offline",
    },
    hindi: {
      title: "संकट हेल्पलाइन",
      description: "ये हेल्पलाइन गोपनीय, अज्ञात हैं और तत्काल सहायता प्रदान करती हैं",
      call: "कॉल करें",
      message: "व्हाट्सएप",
      availableAt: "उपलब्ध",
      languages: "भाषाएँ",
      offlineAvailable: "ऑफ़लाइन उपलब्ध",
    }
  };

  const t = translations[language];

  return (
    <div className="p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-1">{t.title}</h3>
        <p className="text-sm text-gray-600">{t.description}</p>
      </div>
      
      <div className="space-y-4">
        {helplines.map((helpline, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                <div>
                  <h4 className="font-semibold">{helpline.name[language]}</h4>
                  <p className="text-sm text-gray-600">{helpline.description[language]}</p>
                  
                  <div className="mt-2 text-xs space-y-1">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{t.availableAt}:</span> 
                      <span>{helpline.timings[language]}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{t.languages}:</span>
                      <span>{helpline.languages[language]}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={() => callHelpline(helpline.phone)}
                    className="bg-sahayata-blue hover:bg-sahayata-blue/80 w-full sm:w-auto"
                  >
                    <Phone className="h-4 w-4 mr-1" /> {t.call}
                  </Button>
                  
                  {helpline.whatsapp && (
                    <Button 
                      variant="outline" 
                      onClick={() => openWhatsApp(helpline.whatsapp)}
                      className="w-full sm:w-auto"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" /> {t.message}
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Show that this content works offline */}
              <div className="mt-3 flex items-center">
                <Shield className="h-3 w-3 text-green-600 mr-1" />
                <span className="text-xs text-green-700">{t.offlineAvailable}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
