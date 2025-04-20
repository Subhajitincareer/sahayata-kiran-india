
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिन्दी (Hindi)" },
  { code: "ta", name: "தமிழ் (Tamil)" },
  { code: "te", name: "తెలుగు (Telugu)" },
  { code: "bn", name: "বাংলা (Bengali)" },
  { code: "ml", name: "മലയാളം (Malayalam)" },
  { code: "kn", name: "ಕನ್ನಡ (Kannada)" },
  { code: "mr", name: "मराठी (Marathi)" },
];

export function LanguageSelector() {
  const [currentLanguage, setCurrentLanguage] = useState("English");

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="bg-white shadow-md border-gray-200 px-4 flex items-center gap-2"
          >
            <span className="h-4 w-4 rounded-full bg-sahayata-blue flex items-center justify-center text-[10px] text-white">
              अ
            </span>
            <span>{currentLanguage}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => setCurrentLanguage(language.name)}
              className="cursor-pointer"
            >
              {language.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
