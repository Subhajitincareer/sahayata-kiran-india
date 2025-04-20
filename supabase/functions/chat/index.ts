
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { message, mood } = await req.json()

    // System message that includes context about being a mental health support chatbot
    const systemMessage = `You are Kiran, an empathetic mental health support assistant focused on helping students in India. 
    The user's current mood is: ${mood}. Respond with understanding and care, but if you detect signs of crisis, 
    recommend professional help. Keep responses concise and supportive.`

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

    // Crisis keywords to check for in the user's message
    const crisisKeywords = [
      "suicide", "kill myself", "end my life", "self harm",
      "want to die", "hurt myself", "no reason to live"
    ]

    const containsCrisisWord = crisisKeywords.some(keyword => 
      message.toLowerCase().includes(keyword.toLowerCase())
    )

    return new Response(
      JSON.stringify({
        response: aiResponse,
        inCrisis: containsCrisisWord
      }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
