
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, BellOff } from "lucide-react";
import { toast } from "sonner";
import { saveToLocalStorage, getFromLocalStorage } from "@/lib/storage";

export function MoodReminder() {
  const [remindersEnabled, setRemindersEnabled] = useState(false);
  
  // Load preference on mount
  useEffect(() => {
    const savedPreference = getFromLocalStorage("mood-reminders-enabled");
    if (savedPreference !== null) {
      setRemindersEnabled(savedPreference);
    }
  }, []);
  
  const toggleReminders = () => {
    const newState = !remindersEnabled;
    setRemindersEnabled(newState);
    saveToLocalStorage("mood-reminders-enabled", newState);
    
    if (newState) {
      requestNotificationPermission();
      toast.success("Daily mood check-in reminders enabled");
    } else {
      toast.success("Reminders disabled");
    }
  };
  
  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      toast.error("Your browser doesn't support notifications");
      return;
    }
    
    try {
      const permission = await Notification.requestPermission();
      
      if (permission === "granted") {
        scheduleReminder();
      } else {
        toast.error("Permission needed for notifications");
        setRemindersEnabled(false);
        saveToLocalStorage("mood-reminders-enabled", false);
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  };
  
  const scheduleReminder = () => {
    // This is a simple implementation - in a real app you'd use service workers
    // or a more robust notification system
    
    // For demo purposes, we're just showing how it would work
    // In production, you'd schedule this properly with timing logic
    if (remindersEnabled) {
      // Sample encouraging messages
      const messages = [
        "How are you feeling today?",
        "Time for your daily mood check-in!",
        "A moment for yourself - log your mood now",
        "Taking time to reflect on your emotions helps with mental health"
      ];
      
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      
      // In a real implementation, this would be scheduled for the next day
      console.log("Scheduled reminder with message:", randomMessage);
    }
  };
  
  return (
    <Card className="mt-8 bg-sahayata-softGray border-none">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <h3 className="font-semibold">Daily mood check-in reminders</h3>
          <p className="text-sm text-muted-foreground">
            Get a gentle notification to log your mood every day
          </p>
        </div>
        <Button
          variant={remindersEnabled ? "default" : "outline"}
          size="sm"
          onClick={toggleReminders}
          className={remindersEnabled ? "bg-sahayata-blue" : ""}
        >
          {remindersEnabled ? (
            <>
              <Bell className="h-4 w-4 mr-2" /> Enabled
            </>
          ) : (
            <>
              <BellOff className="h-4 w-4 mr-2" /> Disabled
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
