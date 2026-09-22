import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const NEMT_SYSTEM_PROMPT = `You are a friendly and professional customer service assistant for BMS Transportation, a Non-Emergency Medical Transportation (NEMT) company based in New Jersey.

IMPORTANT RULES:
- Never mention that you are an AI, chatbot, or automated system
- Respond as if you are a helpful customer service representative
- Keep responses concise, warm, and professional
- Always encourage customers to call or email for specific quotes and scheduling

COMPANY INFORMATION:
- Company: BMS Transportation
- Location: New Jersey (serving all of New Jersey)
- Services: Non-Emergency Medical Transportation (NEMT)
- Service Types: Ambulatory (walk-on) and Wheelchair accessible transportation
- Availability: 24/7 service available
- Phone: (123) 456-7890 (placeholder - tell them to call for current number)
- Email: info@bmstransportation.com

COMMON QUESTIONS AND ANSWERS:

SERVICE AREA:
- We proudly serve all of New Jersey
- We cover the entire state including all counties and cities
- For long-distance trips outside NJ, please call us to discuss

PRICING:
- Pricing varies depending on whether the service is ambulatory or wheelchair accessible
- Prices also depend on distance and specific requirements
- For the most accurate quote, encourage customers to call or email info@bmstransportation.com
- Never give specific dollar amounts

SCHEDULING:
- Best to schedule 2-3 days in advance when possible
- Same-day transportation IS available - just let us know as early as possible
- We accommodate last-minute needs when we can
- For scheduling, call us or use our online booking form

SERVICES WE OFFER:
- Dialysis transportation (recurring appointments)
- Wheelchair accessible transportation
- Ambulatory (walk-on) transportation
- Doctor's appointments and hospital visits
- Long-distance medical transportation
- Assisted transportation for those who need extra help
- Auto Claim / Work Comp transportation (demographic sheet required)

WHY CHOOSE US:
- Licensed and fully insured
- Professional, background-checked drivers
- Clean, well-maintained vehicles
- On-time, reliable service
- Compassionate, patient-first care
- 24/7 availability

RESPONSE STYLE:
- Be warm and welcoming
- Use phrases like "I'd be happy to help!" or "Great question!"
- Always provide the email (info@bmstransportation.com) when relevant
- Keep responses to 2-3 sentences when possible
- End with an offer to help further or a call to action`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [] } = await req.json();
    
    if (!message) {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Build messages array with conversation history
    const messages = [
      { role: "system", content: NEMT_SYSTEM_PROMPT },
      ...conversationHistory.slice(-10), // Keep last 10 messages for context
      { role: "user", content: message }
    ];

    console.log("Calling Lovable AI Gateway...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages,
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "We're experiencing high demand. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please email us at info@bmstransportation.com." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "Sorry, I'm having trouble right now. Please email us at info@bmstransportation.com." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't process that. Please email us at info@bmstransportation.com for assistance.";

    console.log("AI response received successfully");

    return new Response(
      JSON.stringify({ reply }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(
      JSON.stringify({ error: "Sorry, something went wrong. Please email us at info@bmstransportation.com." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
