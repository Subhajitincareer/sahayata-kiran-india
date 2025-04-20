
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { EmergencyHelpPanel } from "@/components/EmergencyHelpPanel";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function EmergencyHelpButton() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  // Mobile uses Sheet (bottom drawer), desktop uses Dialog (modal)
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            className="fixed bottom-20 right-4 z-50 bg-red-600 hover:bg-red-700 shadow-lg rounded-full h-14 w-14 p-0 flex items-center justify-center"
            aria-label="Emergency Help"
          >
            <AlertCircle className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-xl pt-6 pb-0 px-0">
          <EmergencyHelpPanel onClose={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="fixed bottom-8 right-8 z-50 bg-red-600 hover:bg-red-700 shadow-lg"
          aria-label="Emergency Help"
        >
          <AlertCircle className="h-5 w-5 mr-2" />
          Emergency Help
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <EmergencyHelpPanel onClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
