import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Send, AlertCircle } from "lucide-react";
import { detectCrisis } from "@/lib/crisis-detection";

interface ChatUIProps {
  sessionId: string;
  initialMood?: string;
  onUserMessage?: (message: string) => void;
}

type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
};

export function ChatUI({ sessionId, initialMood, onUserMessage }: ChatUIProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "Hi there! I'm Kiran, your supportive chat assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isCrisisMode, setIsCrisisMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    const crisisCheck = detectCrisis(userMessage);
    
    // Call the onUserMessage callback if provided
    if (onUserMessage) {
      onUserMessage(userMessage);
    }
    
    // Set crisis mode if high-risk content detected
    if (crisisCheck.level === "high") {
      setIsCrisisMode(true);
    }
    
    // Add user message to chat
    const newUserMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: userMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInput("");
    setIsTyping(true);
    
    try {
      // If in crisis mode, create a special message
      if (isCrisisMode || crisisCheck.level === "high") {
        setTimeout(() => {
          const crisisResponse: Message = {
            id: crypto.randomUUID(),
            role: "system",
            content: "I notice you may be going through a difficult time. Please consider reaching out to a professional for immediate support. Our emergency resources are available 24/7 - click the Emergency Help button for direct access to trained counselors.",
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, crisisResponse]);
          setIsTyping(false);
        }, 1000);
        
        return;
      }
      
      // Regular API call for non-crisis messages
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          message: userMessage,
          mood: initialMood || "neutral",
          sessionId
        })
      });
      
      if (!response.ok) {
        throw new Error("Failed to get response");
      }
      
      const data = await response.json();
      
      // Add bot response to chat
      const botResponse: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.response,
        timestamp: new Date()
      };
      
      // Check if the AI detected a crisis
      if (data.inCrisis) {
        setIsCrisisMode(true);
      }
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Fallback response
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "I'm having trouble connecting right now. Please try again in a moment or reach out via the emergency help button if you need immediate support.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <Card>
      <div className="h-[50vh] md:h-[60vh] overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.role === "user"
                    ? "bg-sahayata-blue text-white"
                    : msg.role === "system"
                    ? "bg-red-50 border border-red-100"
                    : "bg-gray-100"
                }`}
              >
                {msg.role === "system" && <AlertCircle className="h-4 w-4 text-red-500 mb-1" />}
                <p className="whitespace-pre-wrap">{msg.content}</p>
                <p className="text-xs opacity-70 text-right mt-1">
                  {msg.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-lg bg-gray-100">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <CardContent className="border-t p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-end gap-2"
        >
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="min-h-24 resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button type="submit" size="icon" disabled={isTyping || !input.trim()}>
            {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
