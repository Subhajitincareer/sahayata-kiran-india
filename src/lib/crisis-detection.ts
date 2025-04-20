
// Crisis detection utilities
// This utility provides functions to detect crisis keywords in text and determine appropriate actions

// Crisis keywords categorized by severity
const crisisKeywords = {
  high: [
    // Suicidal ideation
    "suicide", "kill myself", "end my life", "want to die", "better off dead", 
    "no reason to live", "can't go on", "goodbye forever", "final note",
    // Hindi translations
    "आत्महत्या", "खुद को मारना", "जीवन समाप्त", "मरना चाहता", "मरना चाहती",
  ],
  moderate: [
    // Self-harm
    "cut myself", "hurt myself", "self harm", "harming myself", "cutting", "burn myself",
    "hurting myself", "inflict pain", "punish myself",
    // Severe depression
    "worthless", "hopeless", "can't take it anymore", "pointless", "nothing matters",
    // Hindi translations
    "खुद को काटना", "खुद को चोट", "बेकार", "निराशा", "कुछ मायने नहीं रखता",
  ],
  low: [
    // Concerning but less immediate
    "so sad", "depressed", "anxiety", "no one cares", "lonely", "trapped", "exhausted",
    "overwhelmed", "can't cope", "stressed", "failing", "giving up",
    // Hindi translations
    "उदास", "अकेला", "चिंता", "तनाव", "असफल",
  ],
};

// Types for our detection system
export type CrisisLevel = "none" | "low" | "moderate" | "high";

export interface CrisisDetectionResult {
  level: CrisisLevel;
  keywords: string[];
  inCrisis: boolean;
}

/**
 * Detects crisis keywords in text and returns the severity level
 * @param text Input text to analyze
 * @returns Crisis detection result with severity level and matched keywords
 */
export function detectCrisis(text: string): CrisisDetectionResult {
  if (!text) {
    return { level: "none", keywords: [], inCrisis: false };
  }

  // Normalize text for better matching
  const normalizedText = text.toLowerCase();
  
  // Check high priority first
  for (const keyword of crisisKeywords.high) {
    if (normalizedText.includes(keyword.toLowerCase())) {
      return { 
        level: "high", 
        keywords: [keyword], 
        inCrisis: true 
      };
    }
  }
  
  // Check moderate priority
  for (const keyword of crisisKeywords.moderate) {
    if (normalizedText.includes(keyword.toLowerCase())) {
      return { 
        level: "moderate", 
        keywords: [keyword], 
        inCrisis: true 
      };
    }
  }
  
  // Check low priority
  const matchedLowKeywords = crisisKeywords.low.filter(keyword => 
    normalizedText.includes(keyword.toLowerCase())
  );
  
  if (matchedLowKeywords.length > 0) {
    return { 
      level: "low", 
      keywords: matchedLowKeywords, 
      inCrisis: true 
    };
  }
  
  return { level: "none", keywords: [], inCrisis: false };
}

/**
 * Gets appropriate response actions based on crisis level
 * @param level Crisis severity level
 * @returns Object with action flags
 */
export function getCrisisActions(level: CrisisLevel) {
  switch (level) {
    case "high":
      return {
        showEmergencyHelp: true,
        notifyCounselor: true,
        suggestResources: true,
        showSupportiveMessage: true
      };
    case "moderate":
      return {
        showEmergencyHelp: true,
        notifyCounselor: false,
        suggestResources: true,
        showSupportiveMessage: true
      };
    case "low":
      return {
        showEmergencyHelp: false,
        notifyCounselor: false,
        suggestResources: true,
        showSupportiveMessage: true
      };
    default:
      return {
        showEmergencyHelp: false,
        notifyCounselor: false,
        suggestResources: false,
        showSupportiveMessage: false
      };
  }
}

/**
 * Gets supportive message based on crisis level
 * @param level Crisis severity level
 * @returns Supportive message text
 */
export function getSupportiveMessage(level: CrisisLevel, language: "english" | "hindi" = "english"): string {
  if (language === "hindi") {
    switch (level) {
      case "high":
        return "आप अकेले नहीं हैं। तुरंत सहायता उपलब्ध है। कृपया हमारी आपातकालीन सेवाओं से संपर्क करें।";
      case "moderate":
        return "आपके लिए सहायता उपलब्ध है। कृपया किसी से बात करने पर विचार करें।";
      case "low":
        return "हम देख रहे हैं कि आप मुश्किल समय से गुजर रहे हैं। सहायता उपलब्ध है।";
      default:
        return "";
    }
  }

  switch (level) {
    case "high":
      return "You're not alone. Help is available right now. Please reach out to our emergency services.";
    case "moderate":
      return "Support is available for you. Please consider talking to someone.";
    case "low":
      return "We notice you're going through a difficult time. Help is available.";
    default:
      return "";
  }
}
