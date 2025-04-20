
import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ChatUI } from "@/components/ChatUI";
import { MoodSelector } from "@/components/MoodSelector";
import { useToast } from "@/hooks/use-toast";

const Chat = () => {
  const [sessionId, setSessionId] = useState("");
  const [showMoodSelector, setShowMoodSelector] = useState(true);
  const { toast } = useToast();

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
    
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleMoodSubmit = (mood: string) => {
    setShowMoodSelector(false);
    toast({
      title: "Chat Started",
      description: "You can chat anonymously with our support system.",
      duration: 3000,
    });
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
              <ChatUI sessionId={sessionId} />
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
