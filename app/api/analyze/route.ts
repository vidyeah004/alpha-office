import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

export async function POST(request: Request) {
  try {
    const { tab, payload } = await request.json();
    const groqApiKey = process.env.GROQ_API_KEY;

    // 1. Explicit Check for Groq Token
    if (!groqApiKey) {
      return NextResponse.json(
        { error: 'Inbound Configuration Blocked: GROQ_API_KEY is missing on Vercel deployment settings.' }, 
        { status: 500 }
      );
    }

    // Initialize the Groq Client
    const groq = new Groq({ apiKey: groqApiKey });

    let userPrompt = '';
    if (tab === 'competitor') {
      userPrompt = `Analyze competitor/market entity: "${payload.target}". Evaluate their current strategic standing, implicit vulnerabilities, and identify the unexploited market gaps in their vertical.`;
    } else if (tab === 'vertical') {
      userPrompt = `Develop an Executive Point-of-View (PoV) on the Fintech vertical: "${payload.target}". Outline structural mass adoption blockers, core technological/regulatory moats, and 3 immediate actionable product initiatives.`;
    } else if (tab === 'gtm') {
      userPrompt = `Synthesize a 6-Month Go-To-Market (GTM) Expansion Playbook for entering the "${payload.target}" market with an initial product hook of "${payload.hook}". Detail regulatory localization needs, customer acquisition mechanics, and milestones.`;
    }

    // 2. Execute Native Groq API Completion Request
    const chatCompletion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile', // Blazing fast inference, bulletproof reasoning power
      messages: [
        {
          role: 'system',
          content: `You are a Principal Product Strategist in the CEO Office of an elite, hyper-growth fintech. Your writing style is highly structured, deeply analytical, and clean. You look at things through the combined lens of rigorous asset allocation (CFA framework-inspired structural logic) and rapid technological scalability.
          
          TEMPORAL ANCHOR: The current year is 2026. Any roadmap, milestones, execution horizons, or strategic initiatives you generate must be strictly forward-looking, targeting late 2026, 2027, and beyond. Never generate historical timelines (e.g., 2024 or 2025).

          CRITICAL: Return your response wrapped entirely in clean semantic HTML elements (such as <h3>, <p>, <ul>, <li>, <strong>, <table class="w-full border-collapse">, etc.). Do NOT wrap your response in markdown code fences (\`\`\`html) or raw markdown text. Output the inside HTML directly so it can be safely injected into a container.`
        },
        {
          role: 'user',
          content: userPrompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1200 // Groq accommodates higher generation thresholds smoothly
    });

    // 3. Fallback Validation for Parsing Data Safely
    const htmlOutput = chatCompletion.choices?.[0]?.message?.content || '<p>Response streaming failed. Prompt executed but output layer returned null content.</p>';

    return NextResponse.json({ result: htmlOutput });

  } catch (error: any) {
    console.error(`Groq Runtime Cockpit Failure: ${error.message}`);
    return NextResponse.json(
      { error: `Internal execution pipeline error: ${error.message}` }, 
      { status: 500 }
    );
  }
}
