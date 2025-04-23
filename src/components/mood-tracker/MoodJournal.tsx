
import { useState, useEffect } from "react";
import { MoodSelector } from "@/components/MoodSelector";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { detectCrisis, getCrisisActions, getSupportiveMessage } from "@/lib/crisis-detection";
import { useI18n } from "@/lib/i18n/i18nContext";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@/hooks/useUser";

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
  const { user } = useUser();
  const [mood, setMood] = useState<string | null>(null);
  const [journal, setJournal] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [todaysEntry, setTodaysEntry] = useState<MoodEntry | null>(null);
  // Fix the type issue by ensuring the state is initialized with a valid value
  const [crisisDetected, setCrisisDetected] = useState<"none" | "low" | "moderate" | "high">("none");

  const today = new Date().toISOString().split('T')[0];

  // Check if user has already logged mood today; fetch from Supabase
  useEffect(() => {
    if (!user) return;
    supabase
      .from("mood_entries")
      .select("*")
      .eq("user_id", user.id)
      .eq("date", today)
      .maybeSingle()
      .then(({ data, error }) => {
        if (data) {
          setTodaysEntry(data);
          setMood(data.mood);
          setJournal(data.journal || "");
          if (data.crisis_level && 
              (data.crisis_level === "none" || 
               data.crisis_level === "low" || 
               data.crisis_level === "moderate" || 
               data.crisis_level === "high")) {
            setCrisisDetected(data.crisis_level);
          }
        }
      });
  }, [today, user]);

  // Crisis detection in journal text
  useEffect(() => {
    if (journal && journal.trim() !== "") {
      const { level } = detectCrisis(journal);
      setCrisisDetected(level);

      if (level === "moderate" || level === "high") {
        const supportiveMessage = getSupportiveMessage(level);
        if (supportiveMessage) {
          toast("We're here for you", {
            description: supportiveMessage,
            duration: 10000,
          });
        }
        if (level === "high") {
          const emergencyBtn = document.querySelector('[aria-label="Emergency Help"]') as HTMLButtonElement;
          if (emergencyBtn) {
            setTimeout(() => emergencyBtn.click(), 1000);
          }
        }
      }
    }
  }, [journal]);

  const handleMoodSubmit = async (selectedMood: string) => {
    setMood(selectedMood);
    await saveJournalEntry(selectedMood);
  };

  const saveJournalEntry = async (selectedMood?: string) => {
    if ((!mood && !selectedMood) || !user) return;

    setIsSubmitting(true);

    try {
      const moodToSave = selectedMood || mood;
      const crisisResult = detectCrisis(journal);

      const { data: existing } = await supabase
        .from("mood_entries")
        .select("*")
        .eq("user_id", user.id)
        .eq("date", today)
        .maybeSingle();

      const entryData = {
        user_id: user.id,
        date: today,
        mood: moodToSave!,
        journal: journal.trim() || null,
        timestamp: Date.now(),
        crisis_level: crisisResult.level,
      };

      let result;
      if (existing) {
        result = await supabase
          .from("mood_entries")
          .update(entryData)
          .eq("id", existing.id)
          .select()
          .maybeSingle();
      } else {
        result = await supabase
          .from("mood_entries")
          .insert(entryData)
          .select()
          .maybeSingle();
      }

      setTodaysEntry(result.data || null);

      if (!existing) {
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
