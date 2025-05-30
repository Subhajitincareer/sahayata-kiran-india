
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type Mood = {
  name: string;
  emoji: string;
  color: string;
};

interface MoodSelectorProps {
  onSubmit: (mood: string) => void;
  initialMood?: string;
}

export function MoodSelector({ onSubmit, initialMood }: MoodSelectorProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(initialMood || null);
  
  // Update selectedMood if initialMood changes
  useEffect(() => {
    if (initialMood) {
      setSelectedMood(initialMood);
    }
  }, [initialMood]);
  
  const moods: Mood[] = [
    { name: "Happy", emoji: "😊", color: "bg-green-100" },
    { name: "Calm", emoji: "😌", color: "bg-blue-100" },
    { name: "Sad", emoji: "😢", color: "bg-indigo-100" },
    { name: "Stressed", emoji: "😰", color: "bg-yellow-100" },
    { name: "Anxious", emoji: "😨", color: "bg-orange-100" },
    { name: "Angry", emoji: "😠", color: "bg-red-100" },
    { name: "Depressed", emoji: "😞", color: "bg-purple-100" },
    { name: "Confused", emoji: "😕", color: "bg-gray-100" },
  ];

  const handleSubmit = () => {
    if (selectedMood) {
      onSubmit(selectedMood);
    }
  };

  return (
    <Card className="shadow-sm border-none">
      <CardContent className="pt-6">
        <div className="grid grid-cols-4 gap-4">
          {moods.map((mood) => (
            <div
              key={mood.name}
              onClick={() => setSelectedMood(mood.name)}
              className={`${mood.color} p-3 rounded-lg text-center cursor-pointer transition-transform hover:scale-105 ${
                selectedMood === mood.name ? "ring-2 ring-sahayata-blue scale-105" : ""
              }`}
            >
              <div className="text-2xl mb-1">{mood.emoji}</div>
              <div className="text-xs font-medium">{mood.name}</div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          disabled={!selectedMood} 
          className="w-full bg-sahayata-blue hover:bg-sahayata-blue/80"
        >
          {initialMood ? "Update Mood" : "Save Mood"}
        </Button>
      </CardFooter>
    </Card>
  );
}
