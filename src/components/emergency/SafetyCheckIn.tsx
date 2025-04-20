
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type SafetyCheckInProps = {
  language: "english" | "hindi";
};

export function SafetyCheckIn({ language }: SafetyCheckInProps) {
  const [countdown, setCountdown] = useState(60); // 60 seconds countdown
  const [isSafe, setIsSafe] = useState<boolean | null>(null);
  const [timerActive, setTimerActive] = useState(false);
  const { toast } = useToast();

  const translations = {
    english: {
      title: "Safety Check-In",
      description: "Take a moment to check in with yourself",
      question: "Are you feeling safe right now?",
      yes: "Yes, I'm safe",
      no: "No, I need support",
      startTimer: "Start 1-minute breathing",
      breatheIn: "Breathe in...",
      breatheOut: "Breathe out...",
      seconds: "seconds",
      completedMessage: "Well done. Remember that help is always available.",
      checkedInSafe: "Thank you for checking in. Remember we're here if you need us.",
      checkedInNotSafe: "We're connecting you with support resources.",
    },
    hindi: {
      title: "सुरक्षा चेक-इन",
      description: "स्वयं की जांच करने के लिए एक क्षण लें",
      question: "क्या आप अभी सुरक्षित महसूस कर रहे हैं?",
      yes: "हां, मैं सुरक्षित हूं",
      no: "नहीं, मुझे सहायता चाहिए",
      startTimer: "1-मिनट की सांस शुरू करें",
      breatheIn: "सांस अंदर लें...",
      breatheOut: "सांस बाहर छोड़ें...",
      seconds: "सेकंड",
      completedMessage: "बहुत अच्छे। याद रखें कि सहायता हमेशा उपलब्ध है।",
      checkedInSafe: "चेक इन करने के लिए धन्यवाद। याद रखें कि अगर आपको हमारी जरूरत है तो हम यहां हैं।",
      checkedInNotSafe: "हम आपको सहायता संसाधनों से जोड़ रहे हैं।",
    }
  };

  const t = translations[language];

  useEffect(() => {
    let interval: number | undefined;
    
    if (timerActive && countdown > 0) {
      interval = window.setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setTimerActive(false);
      toast({
        title: "Breathing Exercise Complete",
        description: t.completedMessage,
        duration: 5000,
      });
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, countdown, toast, t]);

  const handleSafetyCheck = (safe: boolean) => {
    setIsSafe(safe);
    
    if (safe) {
      toast({
        title: "Safety Check-In",
        description: t.checkedInSafe,
        duration: 3000,
      });
    } else {
      toast({
        title: "Getting Help",
        description: t.checkedInNotSafe,
        duration: 3000,
      });
      // In a real app, this would trigger additional support options
    }
  };

  const toggleTimer = () => {
    setTimerActive(!timerActive);
    if (!timerActive && countdown === 0) {
      setCountdown(60);
    }
  };

  // Calculate breathing phase (in or out) based on countdown
  const breathingPhase = countdown % 8 < 4 ? "in" : "out";

  return (
    <div className="p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-1">{t.title}</h3>
        <p className="text-sm text-gray-600">{t.description}</p>
      </div>

      <div className="space-y-6">
        {/* Safety Question Section */}
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="font-medium mb-4 text-center">{t.question}</h4>
          
          <div className="flex gap-3">
            <Button
              className={`flex-1 ${isSafe === true ? "bg-green-600" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
              variant={isSafe === true ? "default" : "outline"}
              onClick={() => handleSafetyCheck(true)}
            >
              {isSafe === true && <CheckCircle2 className="h-4 w-4 mr-2" />}
              {t.yes}
            </Button>
            
            <Button
              className={`flex-1 ${isSafe === false ? "bg-red-600" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
              variant={isSafe === false ? "default" : "outline"}
              onClick={() => handleSafetyCheck(false)}
            >
              {isSafe === false && <AlertCircle className="h-4 w-4 mr-2" />}
              {t.no}
            </Button>
          </div>
        </div>
        
        {/* Breathing Exercise Section */}
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-center mb-4">
            <Button
              onClick={toggleTimer}
              variant={timerActive ? "outline" : "default"}
              className={timerActive ? "bg-gray-100 text-gray-800 hover:bg-gray-200" : "bg-sahayata-blue hover:bg-sahayata-blue/80"}
            >
              <Clock className="h-4 w-4 mr-2" />
              {timerActive ? `${countdown} ${t.seconds}` : t.startTimer}
            </Button>
          </div>
          
          {timerActive && (
            <div className="space-y-4 max-w-md mx-auto">
              <Progress value={(countdown / 60) * 100} />
              
              <div 
                className={`text-center p-8 rounded-lg transition-all duration-1000 ease-in-out ${
                  breathingPhase === "in" ? "bg-blue-50 scale-110" : "bg-purple-50 scale-100"
                }`}
              >
                <p className="text-lg font-medium">
                  {breathingPhase === "in" ? t.breatheIn : t.breatheOut}
                </p>
                <div className={`
                  w-16 h-16 mx-auto mt-4 rounded-full bg-white border-4 
                  ${breathingPhase === "in" ? "border-blue-300 scale-100" : "border-purple-300 scale-90"}
                  transition-all duration-2000 ease-in-out
                `}></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
