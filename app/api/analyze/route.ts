import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { tab, payload } = await request.json();
    const openRouterApiKey = process.env.OPENROUTER_API_KEY;

    // 1. Explicit Check for Environment Token
    if (!openRouterApiKey) {
      return NextResponse.json(
        { error: 'Inbound Configuration Blocked: OPENROUTER_API_KEY is missing on Vercel deployment settings.' }, 
        { status: 500 }
      );
    }

    let userPrompt = '';
    if (tab === 'competitor') {
      userPrompt = `Analyze competitor/market entity: "${payload.target}". Evaluate their current strategic standing, implicit vulnerabilities, and identify the unexploited market gaps in their vertical.`;
    } else if (tab === 'vertical') {
      userPrompt = `Develop an Executive Point-of-View (PoV) on the Fintech vertical: "${payload.target}". Outline structural mass adoption blockers, core technological/regulatory moats, and 3 immediate actionable product initiatives.`;
    } else if (tab === 'gtm') {
      userPrompt = `Synthesize a 6-Month Go-To-Market (GTM) Expansion Playbook for entering the "${payload.target}" market with an initial product hook of "${payload.hook}". Detail regulatory localization needs, customer acquisition mechanics, and milestones.`;
    }

    // 2. Defensive Network Execution
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterApiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://qosmic-two.vercel.app', // Explicit public deployment root to pass tracking checks
        'X-Title': 'AlphaOffice Engine'
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash', 
        messages: [
          {
            role: 'system',
            content: `You are a Principal Product Strategist in the CEO Office of an elite, hyper-growth fintech. Your writing style is highly structured, deeply analytical, and clean. You look at things through the combined lens of rigorous asset allocation (CFA framework-inspired structural logic) and rapid technological scalability.
            
            CRITICAL: Return your response wrapped entirely in clean semantic HTML elements (such as <h3>, <p>, <ul>, <li>, <strong>, <table class="w-full border-collapse">, etc.). Do NOT wrap your response in markdown code fences (\`\`\`html) or raw markdown text. Output the inside HTML directly so it can be safely injected into a container.`
          },
          {
            role: 'user',
            content: userPrompt
          }
        ],
        temperature: 0.3
      })
    });

    // 3. Status Gate to Catch Non-200 Responses Safely
    if (!response.ok) {
      const errorPayload = await response.text();
      console.error(`OpenRouter Failure Stream: ${response.status} - ${errorPayload}`);
      return NextResponse.json(
        { error: `OpenRouter execution failed with status ${response.status}. Internal payload: ${errorPayload}` }, 
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // 4. Fallback Validation for Parsing Data Safely
    const htmlOutput = data.choices?.[0]?.message?.content || '<p>Response streaming failed. Prompt executed but output layer returned null content.</p>';

    return NextResponse.json({ result: htmlOutput });

  } catch (error: any) {
    console.error(`Runtime Cockpit Failure: ${error.message}`);
    return NextResponse.json(
      { error: `Internal execution pipeline error: ${error.message}` }, 
      { status: 500 }
    );
  }
}
