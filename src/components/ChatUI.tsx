
import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Send, AlertCircle, Phone } from "lucide-react";
import { detectCrisis } from "@/lib/crisis-detection";

interface ChatUIProps {
  sessionId: string;
  initialMood?: string;
  onUserMessage?: (message: string) => void;
  chatMode?: "standard" | "helpline" | "emergency";
  initialMessage?: string;
}

type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
};

export function ChatUI({ 
  sessionId, 
  initialMood = "neutral", 
  onUserMessage, 
  chatMode = "standard",
  initialMessage
}: ChatUIProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content: initialMessage || "Hi there! I'm Kiran, your supportive chat assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isCrisisMode, setIsCrisisMode] = useState(chatMode === "emergency");
  const [isConnectingToAgent, setIsConnectingToAgent] = useState(false);
  const [agentConnected, setAgentConnected] = useState(chatMode !== "standard");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Add a simulated "typing" indicator for more realistic helpline/emergency chats
  useEffect(() => {
    if ((chatMode === "helpline" || chatMode === "emergency") && messages.length === 1) {
      const timer = setTimeout(() => {
        setIsTyping(false);
        const initialFollowUp: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: chatMode === "emergency" 
            ? "I want you to know that we're here for you in this difficult moment. Please feel free to share what's going on, and I'll do my best to provide appropriate support."
            : "Feel free to share what's on your mind. This is a safe space, and I'm here to listen and help.",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, initialFollowUp]);
      }, 3000);
      
      setIsTyping(true);
      return () => clearTimeout(timer);
    }
  }, [chatMode, messages]);

  // Function to connect with a live agent (simulated)
  const connectWithLiveAgent = () => {
    setIsConnectingToAgent(true);
    
    // Simulate connecting to an agent
    setTimeout(() => {
      const systemMessage: Message = {
        id: crypto.randomUUID(),
        role: "system",
        content: "Connecting you with a professional counselor...",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, systemMessage]);
      
      // Simulate agent connection after a delay
      setTimeout(() => {
        const agentMessage: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Hello, I'm Counselor Priya, a professional with Sahayata Kiran. I've reviewed your conversation and I'm here to provide personalized support. How are you feeling right now?",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, agentMessage]);
        setIsConnectingToAgent(false);
        setAgentConnected(true);
      }, 3000);
    }, 1000);
  };

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
      // If in crisis mode or professional modes, create a special response flow
      if (isCrisisMode || chatMode === "emergency" || chatMode === "helpline" || crisisCheck.level === "high") {
        // If crisis detected and not already connected to an agent, offer to connect
        if (crisisCheck.level === "high" && !agentConnected && chatMode === "standard") {
          setTimeout(() => {
            const crisisResponse: Message = {
              id: crypto.randomUUID(),
              role: "system",
              content: "I notice you may be going through a difficult time. Would you like to connect with a professional counselor for immediate support?",
              timestamp: new Date()
            };
            
            setMessages(prev => [...prev, crisisResponse]);
            setIsTyping(false);
          }, 1000);
          
          return;
        }
        
        // Simulate professional response with typing indicator
        setTimeout(() => {
          let responseContent = "";
          
          if (chatMode === "emergency" || isCrisisMode) {
            // Emergency response templates
            const emergencyResponses = [
              "Thank you for sharing that. I understand this is difficult. What specific support do you need right now?",
              "I appreciate your courage in reaching out. Let's focus on what would help you feel safer right now.",
              "I hear you, and I want you to know that what you're feeling is valid. Let's work through this together, step by step.",
              "Your safety is our priority. Can you tell me more about what you're experiencing so I can provide the most helpful support?",
              "It's important that you reached out. Let's talk about some immediate strategies that might help you through this moment."
            ];
            responseContent = emergencyResponses[Math.floor(Math.random() * emergencyResponses.length)];
          } else if (chatMode === "helpline" || agentConnected) {
            // Professional helpline responses
            const helplineResponses = [
              "Thank you for sharing that with me. Can you tell me more about when you first started feeling this way?",
              "I understand, and I'm here to help you work through these feelings. What coping strategies have you tried so far?",
              "That sounds really challenging. Let's explore some ways to address what you're going through.",
              "I appreciate you trusting me with this information. Have you spoken to anyone else about what you're experiencing?",
              "Your feelings are completely valid. Let's discuss some practical steps that might help you manage this situation."
            ];
            responseContent = helplineResponses[Math.floor(Math.random() * helplineResponses.length)];
          }
          
          const response: Message = {
            id: crypto.randomUUID(),
            role: "assistant",
            content: responseContent,
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, response]);
          setIsTyping(false);
        }, 2000 + Math.random() * 1000);
        
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
        {(chatMode === "helpline" || chatMode === "emergency") && (
          <div className="bg-sahayata-blue/10 rounded-lg p-3 mb-4 flex items-center gap-3">
            <div className="bg-sahayata-blue rounded-full p-2">
              <Phone className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="font-medium text-sm">
                {chatMode === "emergency" ? "Emergency Support Line" : "Professional Helpline"}
              </p>
              <p className="text-xs text-gray-600">
                {chatMode === "emergency" 
                  ? "Priority support with trained crisis counselors" 
                  : "Confidential support with professional counselors"}
              </p>
            </div>
          </div>
        )}
      
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
        {!agentConnected && !isConnectingToAgent && messages.some(msg => msg.role === "system" && msg.content.includes("professional counselor")) && (
          <div className="mb-4 flex justify-center">
            <Button 
              onClick={connectWithLiveAgent} 
              className="bg-sahayata-blue hover:bg-sahayata-blue/80"
            >
              Connect with Professional
            </Button>
          </div>
        )}
      
        {isConnectingToAgent ? (
          <div className="flex items-center justify-center gap-2 p-4 bg-gray-50 rounded-lg">
            <Loader2 className="h-4 w-4 animate-spin text-sahayata-blue" />
            <span className="text-sm">Connecting to a professional counselor...</span>
          </div>
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
}
