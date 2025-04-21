
import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ChatUI } from "@/components/ChatUI";
import { MoodSelector } from "@/components/MoodSelector";
import { useToast } from "@/hooks/use-toast";
import { detectCrisis, getCrisisActions, getSupportiveMessage } from "@/lib/crisis-detection";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useLocation } from "react-router-dom";

const Chat = () => {
  const [sessionId, setSessionId] = useState("");
  const [showMoodSelector, setShowMoodSelector] = useState(true);
  const [userMood, setUserMood] = useState<string | null>(null);
  const [crisisDetected, setCrisisDetected] = useState<"none" | "low" | "moderate" | "high">("none");
  const [userMessages, setUserMessages] = useState<string[]>([]);
  const [chatMode, setChatMode] = useState<"standard" | "helpline" | "emergency">("standard");
  const { toast } = useToast();
  const emergencyBtnRef = useRef<HTMLButtonElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Generate anonymous session ID
    const newSessionId = crypto.randomUUID();
    setSessionId(newSessionId);
    
    // Set up beforeunload listener to warn about closing chat
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "Are you sure you want to leave this chat? Your conversation will not be saved.";
      return e.returnValue;
    };
    
    window.addEventListener("beforeunload", handleBeforeUnload);
    
    // Get reference to the emergency button for potential crisis intervention
    emergencyBtnRef.current = document.querySelector('[aria-label="Emergency Help"]') as HTMLButtonElement;
    
    // Check if chat mode was passed in navigation state
    if (location.state?.mode) {
      setChatMode(location.state.mode);
      // Skip mood selector for emergency or helpline chats
      if (location.state.mode === "emergency" || location.state.mode === "helpline") {
        setShowMoodSelector(false);
        setUserMood(location.state.mode === "emergency" ? "distressed" : "neutral");
        
        // Show appropriate toast based on mode
        if (location.state.mode === "emergency") {
          toast({
            title: "Emergency Chat Started",
            description: "You're now connected with high priority support. A counselor will join shortly.",
            duration: 5000,
          });
        } else if (location.state.mode === "helpline") {
          toast({
            title: "Helpline Support",
            description: "You're now connected with a professional helpline counselor.",
            duration: 5000,
          });
        }
      }
    }
    
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [location, toast]);

  const handleMoodSubmit = (mood: string) => {
    setUserMood(mood);
    setShowMoodSelector(false);
    toast({
      title: "Chat Started",
      description: "You can chat anonymously with our support system.",
      duration: 3000,
    });
  };

  // Monitor user messages for crisis content
  const handleUserMessage = (message: string) => {
    if (!message) return;
    
    // Add message to history for context
    setUserMessages(prev => [...prev, message]);
    
    // Check for crisis indicators
    const crisisResult = detectCrisis(message);
    
    if (crisisResult.level !== "none") {
      setCrisisDetected(crisisResult.level);
      
      // Get appropriate actions based on crisis level
      const actions = getCrisisActions(crisisResult.level);
      
      if (actions.showSupportiveMessage) {
        toast({
          title: "Support Message",
          description: getSupportiveMessage(crisisResult.level),
          duration: 8000,
        });
      }
      
      // For high level crisis, trigger emergency help panel
      if (crisisResult.level === "high" && actions.showEmergencyHelp && emergencyBtnRef.current) {
        setTimeout(() => emergencyBtnRef.current?.click(), 1000);
      }
    }
  };

  const getChatTitle = () => {
    switch (chatMode) {
      case "helpline": return "Helpline Support Chat";
      case "emergency": return "Emergency Support Chat";
      default: return "Anonymous Support Chat";
    }
  };

  const getInitialChatMessage = () => {
    switch (chatMode) {
      case "helpline":
        return "Hi there! I'm a professional counselor from Sahayata Kiran helpline. I'm here to provide you with support and guidance. How can I help you today?";
      case "emergency":
        return "Hello, I'm a crisis counselor. I'm here to provide immediate support during this difficult time. Your wellbeing is our priority. How can I help you right now?";
      default:
        return "Hi there! I'm Kiran, your supportive chat assistant. How can I help you today?";
    }
  };

  return (
    <div className="font-poppins min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-2xl font-bold mb-8 text-center">{getChatTitle()}</h1>
          
          {showMoodSelector ? (
            <MoodSelector onSubmit={handleMoodSubmit} />
          ) : (
            <div className="max-w-3xl mx-auto">
              <p className="text-sm text-gray-500 mb-4 text-center">
                Your chat is anonymous and secure. Session ID: {sessionId.substring(0, 8)}
                {chatMode !== "standard" && (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sahayata-blue text-white">
                    {chatMode === "helpline" ? "Professional Helpline" : "Priority Support"}
                  </span>
                )}
              </p>
              
              {crisisDetected !== "none" && (
                <Alert 
                  className={`mb-4 ${crisisDetected === "high" ? "bg-red-50 border-red-300" : ""}`}
                  variant={crisisDetected === "high" ? "destructive" : undefined}
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>
                    {crisisDetected === "high" 
                      ? "Urgent Support Available" 
                      : "Support Resources Available"}
                  </AlertTitle>
                  <AlertDescription>
                    {getSupportiveMessage(crisisDetected)}
                  </AlertDescription>
                </Alert>
              )}
              
              <ChatUI 
                sessionId={sessionId} 
                initialMood={userMood || undefined}
                onUserMessage={handleUserMessage}
                chatMode={chatMode}
                initialMessage={getInitialChatMessage()}
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
      <LanguageSelector />
    </div>
  );
};

export default Chat;
