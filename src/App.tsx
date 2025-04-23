import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nProvider } from "@/lib/i18n/i18nContext";
import Index from "./pages/Index";
import SelfAssessment from "./pages/SelfAssessment";
import AllAssessments from "./pages/AllAssessments";
import AssessmentDetail from "./pages/AssessmentDetail";
import Chat from "./pages/Chat";
import MoodTracker from "./pages/MoodTracker";
import NotFound from "./pages/NotFound";
import Resources from "./pages/Resources";
import { EmergencyHelpButton } from "./components/EmergencyHelpButton";
import { MobileMenubar } from "@/components/MobileMenubar";
import { UserProvider } from "@/hooks/useUser";
import AuthPage from "@/pages/Auth";
import { useState } from "react";
import Forum from "@/pages/Forum";
import StoryDetail from "@/pages/StoryDetail";

const App = () => {
  // Create a new QueryClient instance within the component to avoid SSR/hydration issues
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <I18nProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/" element={<Index />} />
                <Route path="/assessment" element={<SelfAssessment />} />
                <Route path="/assessment/:id" element={<AssessmentDetail />} />
                <Route path="/all-assessments" element={<AllAssessments />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/mood-tracker" element={<MoodTracker />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/story/:id" element={<StoryDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <EmergencyHelpButton />
              <MobileMenubar />
            </BrowserRouter>
          </TooltipProvider>
        </I18nProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
