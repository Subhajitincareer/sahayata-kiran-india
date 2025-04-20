
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Bell, BellOff, AlertCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFromLocalStorage } from "@/lib/storage";
import { MoodEntry } from "@/components/mood-tracker/MoodJournal";

// This component would be used in an admin dashboard
export function CrisisAlertMonitor() {
  const [crisisEntries, setCrisisEntries] = useState<MoodEntry[]>([]);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  
  // Simulate fetching crisis data - in a real app, this would come from a backend API
  useEffect(() => {
    const fetchCrisisData = () => {
      const allEntries = getFromLocalStorage("mood-entries") || [];
      const entriesInCrisis = allEntries.filter((entry: MoodEntry) => 
        entry.crisisLevel && ["moderate", "high"].includes(entry.crisisLevel)
      );
      
      setCrisisEntries(entriesInCrisis);
    };
    
    // Initial fetch
    fetchCrisisData();
    
    // Set up polling interval (every 30 seconds)
    const intervalId = setInterval(fetchCrisisData, 30000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const getStatusBadge = (level: string) => {
    switch (level) {
      case "high":
        return <Badge variant="destructive">High Risk</Badge>;
      case "moderate":
        return <Badge variant="outline" className="border-amber-500 text-amber-700">Moderate Risk</Badge>;
      case "low":
        return <Badge variant="outline">Low Risk</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-500" />
            Crisis Alert Monitor
          </CardTitle>
          <CardDescription>Real-time monitoring of detected crisis content</CardDescription>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setAlertsEnabled(!alertsEnabled)}
          className="h-8 w-8 p-0"
        >
          {alertsEnabled ? (
            <Bell className="h-4 w-4" />
          ) : (
            <BellOff className="h-4 w-4" />
          )}
        </Button>
      </CardHeader>
      <CardContent>
        {crisisEntries.length > 0 ? (
          <div className="space-y-4">
            {crisisEntries.slice(0, 5).map((entry) => (
              <div key={entry.id} className="border rounded-md p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <span className="font-medium">Anonymous User</span>
                  </div>
                  {entry.crisisLevel && getStatusBadge(entry.crisisLevel)}
                </div>
                <div className="mt-2 text-sm">
                  <p className="line-clamp-2">{entry.journal || "No journal content"}</p>
                </div>
                <div className="mt-2 text-xs text-gray-500 flex justify-between">
                  <span>{new Date(entry.timestamp).toLocaleString()}</span>
                  <span>Mood: {entry.mood}</span>
                </div>
                <div className="mt-2 flex justify-end gap-2">
                  <Button size="sm" variant="outline" className="h-8">
                    View Details
                  </Button>
                  <Button size="sm" className="h-8 bg-sahayata-blue hover:bg-sahayata-blue/80">
                    Reach Out
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              No crisis alerts detected. The system is actively monitoring for potential crisis indicators.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
