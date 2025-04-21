
import { useState, useEffect } from "react";
import { MoodSelector } from "@/components/MoodSelector";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { saveToLocalStorage, getFromLocalStorage } from "@/lib/storage";
import { formatDate } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { detectCrisis, getCrisisActions, getSupportiveMessage } from "@/lib/crisis-detection";
import { useI18n } from "@/lib/i18n/i18nContext";

export type MoodEntry = {
  id: string;
  date: string;
  mood: string;
  journal?: string;
  tags?: string[];
  timestamp: number;
  crisisLevel?: "none" | "low" | "moderate" | "high";
};

export function MoodJournal() {
  const { t } = useI18n();
  const [mood, setMood] = useState<string | null>(null);
  const [journal, setJournal] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [todaysEntry, setTodaysEntry] = useState<MoodEntry | null>(null);
  const [crisisDetected, setCrisisDetected] = useState<"none" | "low" | "moderate" | "high">("none");
  
  const today = new Date().toISOString().split('T')[0];
  
  // Check if user has already logged mood today
  useEffect(() => {
    const entries = getFromLocalStorage("mood-entries") || [];
    const existingEntry = entries.find((entry: MoodEntry) => entry.date === today);
    if (existingEntry) {
      setTodaysEntry(existingEntry);
      setMood(existingEntry.mood);
      setJournal(existingEntry.journal || "");
      if (existingEntry.crisisLevel && existingEntry.crisisLevel !== "none") {
        setCrisisDetected(existingEntry.crisisLevel);
      }
    }
  }, [today]);
  
  // Autosave journal entry
  useEffect(() => {
    const autosaveTimer = setTimeout(() => {
      if (mood && journal && journal.trim() !== "") {
        saveJournalEntry();
      }
    }, 3000);
    
    return () => clearTimeout(autosaveTimer);
  }, [journal, mood]);
  
  // Crisis detection in journal text
  useEffect(() => {
    if (journal && journal.trim() !== "") {
      const { level } = detectCrisis(journal);
      setCrisisDetected(level);
      
      // Show supportive message for moderate and high crisis levels
      if (level === "moderate" || level === "high") {
        const supportiveMessage = getSupportiveMessage(level);
        if (supportiveMessage) {
          // Fix: Using the correct toast format - toast(message) or toast.success/error/etc
          toast("We're here for you", {
            description: supportiveMessage,
            duration: 10000,
          });
        }
        
        // Automatically open emergency help panel for high crisis levels
        if (level === "high") {
          // Simulate clicking the emergency help button
          const emergencyBtn = document.querySelector('[aria-label="Emergency Help"]') as HTMLButtonElement;
          if (emergencyBtn) {
            setTimeout(() => emergencyBtn.click(), 1000);
          }
        }
      }
    }
  }, [journal]);
  
  const handleMoodSubmit = (selectedMood: string) => {
    setMood(selectedMood);
    saveJournalEntry(selectedMood);
  };
  
  const saveJournalEntry = (selectedMood?: string) => {
    if (!mood && !selectedMood) return;
    
    setIsSubmitting(true);
    
    try {
      const entries = getFromLocalStorage("mood-entries") || [];
      const moodToSave = selectedMood || mood;
      
      // Check for crisis content
      const crisisResult = detectCrisis(journal);
      
      const newEntry: MoodEntry = {
        id: todaysEntry?.id || crypto.randomUUID(),
        date: today,
        mood: moodToSave!,
        journal: journal.trim() || undefined,
        timestamp: Date.now(),
        crisisLevel: crisisResult.level
      };
      
      // Remove today's entry if it exists
      const filteredEntries = entries.filter((entry: MoodEntry) => entry.date !== today);
      
      // Add the new entry
      const updatedEntries = [newEntry, ...filteredEntries];
      
      // Save to localStorage
      saveToLocalStorage("mood-entries", updatedEntries);
      
      setTodaysEntry(newEntry);
      
      if (!todaysEntry) {
        toast.success("Mood logged successfully!");
      } else {
        toast.success("Journal entry updated");
      }
    } catch (error) {
      console.error("Error saving mood entry:", error);
      toast.error("Failed to save your entry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{todaysEntry ? t("mood.updateToday") : t("mood.howAreYou")}</CardTitle>
          <CardDescription>{formatDate(new Date())}</CardDescription>
        </CardHeader>
        <CardContent>
          <MoodSelector onSubmit={handleMoodSubmit} initialMood={mood || undefined} />
        </CardContent>
      </Card>
      
      {mood && (
        <Card>
          <CardHeader>
            <CardTitle>{t("mood.journalEntry")}</CardTitle>
            <CardDescription>{t("mood.journalDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            {(crisisDetected === "moderate" || crisisDetected === "high") && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{t("mood.crisisDetectedTitle")}</AlertTitle>
                <AlertDescription>
                  {getSupportiveMessage(crisisDetected)}
                </AlertDescription>
              </Alert>
            )}
            
            {crisisDetected === "low" && (
              <Alert className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{t("mood.supportTitle")}</AlertTitle>
                <AlertDescription>
                  {getSupportiveMessage(crisisDetected)}
                </AlertDescription>
              </Alert>
            )}
            
            <Textarea
              placeholder={t("mood.journal")}
              className="min-h-[200px]"
              value={journal}
              onChange={(e) => setJournal(e.target.value)}
            />
            <div className="mt-4 text-right">
              <Button 
                onClick={() => saveJournalEntry()}
                disabled={isSubmitting}
              >
                {isSubmitting ? t("mood.saving") : t("mood.save")}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
