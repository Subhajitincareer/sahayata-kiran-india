
import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoodEntry } from "./MoodJournal";
import { getFromLocalStorage } from "@/lib/storage";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip, PieChart, Pie } from "recharts";

// Mood colors for charting
const MOOD_COLORS = {
  "Happy": "#4ade80", // green-400
  "Calm": "#60a5fa", // blue-400
  "Sad": "#818cf8", // indigo-400
  "Stressed": "#facc15", // yellow-400
  "Anxious": "#fb923c", // orange-400
  "Angry": "#f87171", // red-400
  "Depressed": "#a78bfa", // purple-400
  "Confused": "#9ca3af", // gray-400
};

type TimeRange = "week" | "month" | "year";

export function MoodCharts() {
  const [timeRange, setTimeRange] = useState<TimeRange>("week");
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  
  useEffect(() => {
    const storedEntries = getFromLocalStorage("mood-entries") || [];
    setEntries(storedEntries);
  }, []);
  
  const filteredEntries = useMemo(() => {
    const now = new Date();
    let cutoffDate = new Date();
    
    if (timeRange === "week") {
      cutoffDate.setDate(now.getDate() - 7);
    } else if (timeRange === "month") {
      cutoffDate.setMonth(now.getMonth() - 1);
    } else {
      cutoffDate.setFullYear(now.getFullYear() - 1);
    }
    
    return entries.filter(entry => new Date(entry.timestamp) >= cutoffDate);
  }, [entries, timeRange]);
  
  const chartData = useMemo(() => {
    if (!filteredEntries.length) return [];
    
    // For daily view in the last week
    if (timeRange === "week") {
      const last7Days = Array(7).fill(0).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split('T')[0];
      }).reverse();
      
      return last7Days.map(date => {
        const entry = filteredEntries.find(e => e.date === date);
        return {
          date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
          mood: entry?.mood || null,
          moodValue: entry ? getMoodValue(entry.mood) : 0
        };
      });
    }
    
    // For monthly or yearly, aggregate by week or month
    const groupedData: Record<string, { count: number, moodSum: number, moods: Record<string, number> }> = {};
    
    filteredEntries.forEach(entry => {
      let key;
      if (timeRange === "month") {
        // Group by week of month
        const date = new Date(entry.timestamp);
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        key = weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      } else {
        // Group by month of year
        key = new Date(entry.timestamp).toLocaleDateString('en-US', { month: 'short' });
      }
      
      if (!groupedData[key]) {
        groupedData[key] = { count: 0, moodSum: 0, moods: {} };
      }
      
      groupedData[key].count++;
      groupedData[key].moodSum += getMoodValue(entry.mood);
      
      if (!groupedData[key].moods[entry.mood]) {
        groupedData[key].moods[entry.mood] = 0;
      }
      groupedData[key].moods[entry.mood]++;
    });
    
    return Object.entries(groupedData).map(([key, value]) => ({
      date: key,
      moodValue: value.moodSum / value.count,
      moods: value.moods
    }));
    
  }, [filteredEntries, timeRange]);
  
  const moodFrequency = useMemo(() => {
    if (!filteredEntries.length) return [];
    
    const frequency: Record<string, number> = {};
    
    filteredEntries.forEach(entry => {
      if (!frequency[entry.mood]) {
        frequency[entry.mood] = 0;
      }
      frequency[entry.mood]++;
    });
    
    return Object.entries(frequency).map(([mood, count]) => ({
      name: mood,
      value: count,
      color: MOOD_COLORS[mood as keyof typeof MOOD_COLORS] || "#9ca3af"
    })).sort((a, b) => b.value - a.value);
  }, [filteredEntries]);
  
  const dominantMood = useMemo(() => {
    if (!moodFrequency.length) return null;
    return moodFrequency[0].name;
  }, [moodFrequency]);
  
  const dominantMoodPercentage = useMemo(() => {
    if (!moodFrequency.length || !filteredEntries.length) return 0;
    return Math.round((moodFrequency[0].value / filteredEntries.length) * 100);
  }, [moodFrequency, filteredEntries]);
  
  function getMoodValue(mood: string): number {
    // Convert mood to a numerical value for charting
    // Happy: 5, Calm: 4, Neutral: 3, Sad: 2, Angry/Anxious: 1
    const moodValues: Record<string, number> = {
      "Happy": 5,
      "Calm": 4,
      "Confused": 3,
      "Sad": 2,
      "Stressed": 2,
      "Anxious": 1,
      "Angry": 1,
      "Depressed": 1
    };
    
    return moodValues[mood] || 3;
  }
  
  // If no entries, show empty state
  if (!entries.length) {
    return (
      <Card className="border-dashed">
        <CardContent className="pt-6 text-center py-10">
          <div className="mb-4 text-muted-foreground">
            <ChartLine className="h-12 w-12 mx-auto opacity-50" />
          </div>
          <h3 className="text-lg font-medium mb-2">No mood data yet</h3>
          <p className="text-muted-foreground mb-6">
            Log your mood daily to see patterns and insights over time.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Mood Insights</h2>
        <div className="flex space-x-2">
          <Button 
            variant={timeRange === "week" ? "default" : "outline"} 
            size="sm"
            onClick={() => setTimeRange("week")}
          >
            Week
          </Button>
          <Button 
            variant={timeRange === "month" ? "default" : "outline"} 
            size="sm"
            onClick={() => setTimeRange("month")}
          >
            Month
          </Button>
          <Button 
            variant={timeRange === "year" ? "default" : "outline"} 
            size="sm"
            onClick={() => setTimeRange("year")}
          >
            Year
          </Button>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mood Trend</CardTitle>
            <CardDescription>
              How your mood has changed over the {timeRange}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer 
              className="h-[300px]" 
              config={{
                "happy": { color: MOOD_COLORS["Happy"] },
                "calm": { color: MOOD_COLORS["Calm"] },
                "sad": { color: MOOD_COLORS["Sad"] },
                "stressed": { color: MOOD_COLORS["Stressed"] },
                "anxious": { color: MOOD_COLORS["Anxious"] },
                "angry": { color: MOOD_COLORS["Angry"] },
                "depressed": { color: MOOD_COLORS["Depressed"] },
                "confused": { color: MOOD_COLORS["Confused"] },
              }}
            >
              <BarChart data={chartData}>
                <XAxis dataKey="date" />
                <YAxis hide />
                <ChartTooltip
                  content={
                    <ChartTooltipContent 
                      formatter={(value, name) => {
                        if (name === "moodValue" && typeof value === "number") {
                          const moodMap: Record<number, string> = {
                            1: "Anxious/Angry",
                            2: "Sad/Stressed",
                            3: "Neutral",
                            4: "Calm",
                            5: "Happy"
                          };
                          return moodMap[value] || value;
                        }
                        return value;
                      }}
                    />
                  }
                />
                <Bar dataKey="moodValue" name="Mood">
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.mood ? (MOOD_COLORS[entry.mood as keyof typeof MOOD_COLORS] || "#9ca3af") : "#e5e7eb"} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Mood Distribution</CardTitle>
            <CardDescription>
              Frequency of each mood during this {timeRange}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ChartContainer
                config={{
                  "happy": { color: MOOD_COLORS["Happy"] },
                  "calm": { color: MOOD_COLORS["Calm"] },
                  "sad": { color: MOOD_COLORS["Sad"] },
                  "stressed": { color: MOOD_COLORS["Stressed"] },
                  "anxious": { color: MOOD_COLORS["Anxious"] },
                  "angry": { color: MOOD_COLORS["Angry"] },
                  "depressed": { color: MOOD_COLORS["Depressed"] },
                  "confused": { color: MOOD_COLORS["Confused"] },
                }}
              >
                <PieChart>
                  <Pie
                    data={moodFrequency}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {moodFrequency.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color} 
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ChartContainer>
            </div>
            
            {dominantMood && (
              <div className="mt-4 text-center">
                <p className="text-muted-foreground">
                  You felt <span className="font-semibold text-foreground">{dominantMood}</span> most often — 
                  <span className="font-semibold text-foreground"> {dominantMoodPercentage}%</span> of the time
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Import the ChartLine icon
import { ChartLine } from "lucide-react";
