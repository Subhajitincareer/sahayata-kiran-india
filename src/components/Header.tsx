
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Heart, MessageCircle, BookOpen, Shield, ChartLine } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-full bg-sahayata-blue p-1">
            <Heart className="h-5 w-5 text-white" />
          </div>
          <span className="font-poppins text-xl font-bold">Sahayata Kiran</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-sahayata-blue">Home</Link>
          <Link to="/assessment" className="text-sm font-medium hover:text-sahayata-blue">Self-Assessment</Link>
          <Link to="/mood-tracker" className="text-sm font-medium hover:text-sahayata-blue">Mood Tracker</Link>
          <Link to="/resources" className="text-sm font-medium hover:text-sahayata-blue">Resources</Link>
          <Link to="/stories" className="text-sm font-medium hover:text-sahayata-blue">Stories</Link>
          <Link to="/forum" className="text-sm font-medium hover:text-sahayata-blue">Forum</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex gap-2">
            <Phone className="h-4 w-4" /> Helpline
          </Button>
          <Button size="sm" className="bg-sahayata-blue hover:bg-sahayata-blue/80">Get Help Now</Button>
        </div>
      </div>
    </header>
  );
}
