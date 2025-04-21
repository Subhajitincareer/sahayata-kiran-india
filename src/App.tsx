import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nProvider } from "@/lib/i18n/i18nContext";
import Index from "./pages/Index";
import SelfAssessment from "./pages/SelfAssessment";
import Chat from "./pages/Chat";
import MoodTracker from "./pages/MoodTracker";
import NotFound from "./pages/NotFound";
import { EmergencyHelpButton } from "./components/EmergencyHelpButton";
import { MobileMenubar } from "@/components/MobileMenubar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/assessment" element={<SelfAssessment />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/mood-tracker" element={<MoodTracker />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <EmergencyHelpButton />
          <MobileMenubar />
        </BrowserRouter>
      </TooltipProvider>
    </I18nProvider>
  </QueryClientProvider>
);

export default App;
