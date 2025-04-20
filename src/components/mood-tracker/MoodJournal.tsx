
import { useState, useEffect } from "react";
import { MoodSelector } from "@/components/MoodSelector";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { saveToLocalStorage, getFromLocalStorage } from "@/lib/storage";
import { formatDate } from "@/lib/utils";

export type MoodEntry = {
  id: string;
  date: string;
  mood: string;
  journal?: string;
  tags?: string[];
  timestamp: number;
};

export function MoodJournal() {
  const [mood, setMood] = useState<string | null>(null);
  const [journal, setJournal] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [todaysEntry, setTodaysEntry] = useState<MoodEntry | null>(null);
  
  const today = new Date().toISOString().split('T')[0];
  
  // Check if user has already logged mood today
  useEffect(() => {
    const entries = getFromLocalStorage("mood-entries") || [];
    const existingEntry = entries.find((entry: MoodEntry) => entry.date === today);
    if (existingEntry) {
      setTodaysEntry(existingEntry);
      setMood(existingEntry.mood);
      setJournal(existingEntry.journal || "");
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
      
      const newEntry: MoodEntry = {
        id: todaysEntry?.id || crypto.randomUUID(),
        date: today,
        mood: moodToSave!,
        journal: journal.trim() || undefined,
        timestamp: Date.now()
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
          <CardTitle>{todaysEntry ? "Update Today's Mood" : "How are you feeling today?"}</CardTitle>
          <CardDescription>{formatDate(new Date())}</CardDescription>
        </CardHeader>
        <CardContent>
          <MoodSelector onSubmit={handleMoodSubmit} initialMood={mood || undefined} />
        </CardContent>
      </Card>
      
      {mood && (
        <Card>
          <CardHeader>
            <CardTitle>Journal Entry</CardTitle>
            <CardDescription>Write about your thoughts and feelings today</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="How was your day? What's on your mind?"
              className="min-h-[200px]"
              value={journal}
              onChange={(e) => setJournal(e.target.value)}
            />
            <div className="mt-4 text-right">
              <Button 
                onClick={() => saveJournalEntry()}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Entry"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
