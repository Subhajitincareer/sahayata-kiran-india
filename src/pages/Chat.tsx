
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

const Chat = () => {
  const [sessionId, setSessionId] = useState("");
  const [showMoodSelector, setShowMoodSelector] = useState(true);
  const [userMood, setUserMood] = useState<string | null>(null);
  const [crisisDetected, setCrisisDetected] = useState<"none" | "low" | "moderate" | "high">("none");
  const [userMessages, setUserMessages] = useState<string[]>([]);
  const { toast } = useToast();
  const emergencyBtnRef = useRef<HTMLButtonElement | null>(null);

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
    
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

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

  return (
    <div className="font-poppins min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-2xl font-bold mb-8 text-center">Anonymous Support Chat</h1>
          
          {showMoodSelector ? (
            <MoodSelector onSubmit={handleMoodSubmit} />
          ) : (
            <div className="max-w-3xl mx-auto">
              <p className="text-sm text-gray-500 mb-4 text-center">
                Your chat is anonymous and secure. Session ID: {sessionId.substring(0, 8)}
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
