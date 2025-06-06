
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Crisis keywords to check for in user messages
const crisisKeywords = [
  "suicide", "kill myself", "end my life", "self harm",
  "want to die", "hurt myself", "no reason to live",
  "आत्महत्या", "खुद को मारना", "जीवन समाप्त", "मरना चाहता", "मरना चाहती"
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { message, mood } = await req.json()

    // Check for crisis indicators in the message
    const containsCrisisWord = crisisKeywords.some(keyword => 
      message.toLowerCase().includes(keyword.toLowerCase())
    )

    // System message that includes context about being a mental health support chatbot
    let systemMessage = `You are Kiran, an empathetic mental health support assistant focused on helping students in India. 
    The user's current mood is: ${mood}. Respond with understanding and care, but if you detect signs of crisis, 
    recommend professional help. Keep responses concise and supportive.`

    // If crisis is detected, add special instructions for the AI
    if (containsCrisisWord) {
      systemMessage += ` 
      IMPORTANT: The user has expressed content that may indicate they are in crisis. 
      Respond with extra compassion, validate their feelings, and strongly encourage them to seek immediate help.
      Remind them of the emergency resources available through the "Emergency Help" button.
      Do not minimize their feelings or suggest that things will simply get better.`
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemMessage },
            { role: 'user', content: message }
          ],
          temperature: 0.7,
          max_tokens: 300,
        }),
      })

      // Check if the response is successful before trying to parse it
      if (!response.ok) {
        const errorText = await response.text();
        console.error('OpenAI API error:', response.status, errorText);
        throw new Error(`OpenAI API returned ${response.status}: ${errorText}`);
      }

      const data = await response.json()
      
      // Add safety checks to ensure data has the expected structure
      if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
        console.error('Unexpected OpenAI API response structure:', JSON.stringify(data));
        throw new Error('Invalid response from OpenAI API');
      }
      
      const aiResponse = data.choices[0].message.content

      return new Response(
        JSON.stringify({
          response: aiResponse,
          inCrisis: containsCrisisWord
        }), 
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    } catch (openAiError) {
      console.error('OpenAI API Error:', openAiError);
      
      // Provide a fallback response when OpenAI fails
      let fallbackResponse = generateFallbackResponse(message, mood, containsCrisisWord);
      
      return new Response(
        JSON.stringify({
          response: fallbackResponse,
          inCrisis: containsCrisisWord,
          usingFallback: true
        }), 
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }
  } catch (error) {
    console.error('General Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})

// Fallback response generator function when OpenAI API is unavailable
function generateFallbackResponse(userMessage: string, mood: string, inCrisis: boolean): string {
  const userMessageLower = userMessage.toLowerCase();
  
  // If crisis is detected, provide a crisis-focused response
  if (inCrisis) {
    return "I notice you may be going through a very difficult time. Your feelings are valid, and I want you to know that you're not alone. Please consider reaching out to a professional for immediate support using our emergency help resources. They are trained to help you through this moment.";
  }
  
  // Standard fallback responses
  if (userMessageLower.includes("hello") || userMessageLower.includes("hi")) {
    return "Hello! I'm Kiran. How can I support you today?";
  } else if (userMessageLower.includes("sad") || userMessageLower.includes("depress")) {
    return "I'm sorry to hear you're feeling down. It's important to acknowledge these feelings. Would you like to talk more about what's troubling you?";
  } else if (userMessageLower.includes("stress") || userMessageLower.includes("anxiety") || userMessageLower.includes("anxious")) {
    return "Dealing with stress and anxiety can be challenging. Consider taking a few deep breaths. Would you like to explore some coping strategies together?";
  } else if (userMessageLower.includes("thank")) {
    return "You're welcome! I'm here to support you whenever you need someone to talk to.";
  } else if (userMessageLower.includes("help") || userMessageLower.includes("support")) {
    return "I'm here to support you. Please share what's on your mind, and we can work through it together.";
  } else {
    return "I'm here to listen and help. Can you tell me more about how you're feeling today?";
  }
}
