
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MoodJournal } from "@/components/mood-tracker/MoodJournal";
import { MoodCharts } from "@/components/mood-tracker/MoodCharts";
import { MoodReminder } from "@/components/mood-tracker/MoodReminder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, ChartLine, BookText } from "lucide-react";

export default function MoodTracker() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6 md:py-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Mood Tracker</h1>
          <p className="text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
            Track your daily emotions, write journal entries, and gain insights into your emotional patterns.
            All data is stored locally on your device for complete privacy.
          </p>

          <Tabs defaultValue="journal" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="journal" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Today's Entry</span>
                <span className="sm:hidden">Today</span>
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex items-center gap-2">
                <ChartLine className="h-4 w-4" />
                <span className="hidden sm:inline">Mood Insights</span>
                <span className="sm:hidden">Insights</span>
              </TabsTrigger>
              <TabsTrigger value="journal-history" className="flex items-center gap-2">
                <BookText className="h-4 w-4" />
                <span className="hidden sm:inline">Journal History</span>
                <span className="sm:hidden">History</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="journal">
              <MoodJournal />
            </TabsContent>
            <TabsContent value="insights">
              <MoodCharts />
            </TabsContent>
            <TabsContent value="journal-history">
              <div className="text-center py-12 text-muted-foreground">
                <BookText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Journal history coming soon...</p>
              </div>
            </TabsContent>
          </Tabs>
          
          <MoodReminder />
        </div>
      </main>
      <Footer />
    </div>
  );
}
