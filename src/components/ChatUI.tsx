
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import { Send, Phone, MessageCircle, AlertCircle, Info } from "lucide-react";

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot" | "counselor";
  timestamp: Date;
  usingFallback?: boolean;
}

interface ChatUIProps {
  sessionId: string;
}

export function ChatUI({ sessionId }: ChatUIProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [inCrisisMode, setInCrisisMode] = useState(false);
  const [waiting, setWaiting] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      id: crypto.randomUUID(),
      text: "Hi there! I'm Kiran, your mental health support assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const sendMessageToAI = async (message: string) => {
    try {
      setIsTyping(true);
      
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { message, mood: 'calm' }
      });

      if (error) throw error;

      if (data.inCrisis) {
        handleCrisisDetected();
      } else {
        const botMessage: ChatMessage = {
          id: crypto.randomUUID(),
          text: data.response,
          sender: "bot",
          timestamp: new Date(),
          usingFallback: data.usingFallback
        };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      }
    } catch (error) {
      console.error("Error sending message to AI:", error);
      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        text: "I apologize, but I'm having trouble responding right now. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };
  
  const handleCrisisDetected = () => {
    const crisisMessage: ChatMessage = {
      id: crypto.randomUUID(),
      text: "I notice you may be in distress. I'm connecting you with a mental health professional who can better assist you.",
      sender: "bot",
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, crisisMessage]);
    setInCrisisMode(true);
    setWaiting(true);
    
    setTimeout(() => {
      const counselorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        text: "Hi, I'm Priya, a mental health counselor. I'm here to help. Can you tell me more about what you're going through?",
        sender: "counselor",
        timestamp: new Date(),
      };
      setMessages(prevMessages => [...prevMessages, counselorMessage]);
      setWaiting(false);
    }, 5000);
  };
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setNewMessage("");
    
    inputRef.current?.focus();
    
    if (!inCrisisMode) {
      sendMessageToAI(newMessage);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[600px] border rounded-lg shadow-sm overflow-hidden bg-white">
      <div className="p-4 border-b bg-sahayata-softGray flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`h-3 w-3 rounded-full ${inCrisisMode ? "bg-red-500" : "bg-green-500"}`}></div>
          <h3 className="font-medium">
            {inCrisisMode ? "Speaking with Counselor" : "Chat with Kiran"}
          </h3>
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="text-xs">
              Need Urgent Help?
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Crisis Resources</SheetTitle>
            </SheetHeader>
            <div className="space-y-4 mt-6">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>If you're in immediate danger</AlertTitle>
                <AlertDescription>
                  Please call emergency services (112) right away.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4 mt-4">
                <div className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="bg-sahayata-blue/20 p-2 rounded-full">
                    <Phone className="h-5 w-5 text-sahayata-blue" />
                  </div>
                  <div>
                    <p className="font-medium">National Crisis Helpline</p>
                    <p className="text-sm text-gray-600">9152987821</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="bg-sahayata-purple/20 p-2 rounded-full">
                    <MessageCircle className="h-5 w-5 text-sahayata-purple" />
                  </div>
                  <div>
                    <p className="font-medium">Crisis Text Line</p>
                    <p className="text-sm text-gray-600">Text HELLO to 741741</p>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`max-w-[80%] px-4 py-3 rounded-lg text-sm ${
                  msg.sender === "user" 
                    ? "bg-sahayata-blue text-white rounded-br-none" 
                    : msg.sender === "counselor"
                      ? "bg-sahayata-purple/20 rounded-bl-none"
                      : "bg-gray-100 rounded-bl-none"
                }`}
              >
                {msg.sender !== "user" && (
                  <p className="text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                    {msg.sender === "counselor" ? "Counselor" : "Kiran AI"}
                    {msg.usingFallback && (
                      <span className="inline-flex items-center text-orange-500" title="Using backup system">
                        <Info className="h-3 w-3" />
                      </span>
                    )}
                  </p>
                )}
                <p>{msg.text}</p>
                <p className="text-xs mt-1 opacity-70 text-right">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 px-4 py-3 rounded-lg text-sm rounded-bl-none">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
          
          {inCrisisMode && waiting && (
            <div className="bg-yellow-100 text-yellow-800 p-3 rounded-lg text-sm text-center">
              Connecting you with a counselor. Please wait a moment...
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <div className="p-3 border-t">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1"
            autoFocus
          />
          <Button 
            onClick={handleSendMessage}
            size="icon" 
            className={`rounded-full ${!newMessage.trim() ? 'opacity-50' : ''}`}
            disabled={!newMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          {inCrisisMode 
            ? "You're speaking with a trained counselor. This conversation is confidential." 
            : "This is an AI assistant. In a crisis, a counselor will join the chat."}
        </p>
      </div>
    </div>
  );
}
