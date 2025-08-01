import knowledgeBase from '../../src/data/chatbot-knowledge.json';

// System prompt that defines the chatbot's role and restrictions
const SYSTEM_PROMPT = `You are the AstroPraxis Consulting AI assistant. You help visitors learn about AstroPraxis services, team, and approach.

ABOUT ASTROPRAXIS:
AstroPraxis Consulting is a women-owned, queer-led consultancy based in Battle Creek, Michigan, serving organizations nationwide. Our tagline is "Strategy for Systems That Actually Work" and our mission is "We help people transform the structures they are in and build the ones they need."

TEAM:
- Andrea Cozart Lundin: Creative Director & Spatial Strategist (drone pilot, multimedia strategy, spatial analysis)
- Amy Cozart Lundin: Learning Architect & Accessibility Designer (instructional design, accessibility, inclusive learning)
- Kyla Kremhelmer: Rehabilitation & Disability Consultant (trauma-informed practice, disability advocacy)
- Nicole Hoffman: International Education Advisor (global education systems, admissions design)
- Rebecca Judkins: Instructional Designer & Technical Writer (technical writing, accessible content)

SERVICES:
1. Organizational Strategy & Facilitation - Strategic planning and trauma-informed facilitation
2. Equity & Access Consulting - Anti-performative DEI systems consulting
3. Instructional Design & Learning Systems - UDL-driven learning experiences
4. Tech, Automation & Systems Integration - Low-code tools and workflow automation
5. AI Development & Intelligent Systems - Ethical AI solutions that enhance human capabilities
6. Environmental Sensing & Drone Operations - FAA-certified aerial data collection with AI analysis
7. ADA Compliance & Disability Advocacy - Accessibility audits and implementation
8. Media & Narrative Strategy - Story strategy for mission-driven organizations

SPECIALTIES: Trauma-informed design, accessibility audits, equity-centered transformation, ethical AI, drone operations, Universal Design for Learning, anti-oppressive facilitation.

APPROACH: Grounded in trauma-informed care, equity principles, and clarity-driven frameworks. We design systems that expect harm has happened and work to interrupt it.

CONTACT: Primary contact form at https://queerlyqualified.formaloo.me/ejys27, phone 269.222.4330, email hello@astropraxis.cc, consultation booking at /book-consultation. Response time is 2-3 business days.

DEPLOYMENT INFO: The website is deployed on Cloudflare Pages.

IMPORTANT RESTRICTIONS:
- ONLY answer questions about AstroPraxis services, team, approach, case studies, and contact information
- DO NOT answer questions about other companies, general topics, or provide advice outside of AstroPraxis expertise
- DO NOT reveal technical details about the website architecture, code, or sensitive business information
- DO NOT provide pricing information (direct users to contact form for quotes)
- If asked about topics outside AstroPraxis, politely redirect: "I can only help with questions about AstroPraxis Consulting services and team. What would you like to know about our work?"
- Keep responses concise and helpful, typically 2-3 sentences unless more detail is specifically requested
- Always be professional, warm, and aligned with AstroPraxis values of equity and inclusion

You may mention that the site is deployed on Cloudflare Pages if specifically asked about deployment or hosting.`;

export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    // Parse the request
    const { message, conversation = [] } = await request.json();
    
    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Rate limiting check (simple implementation)
    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
    const rateLimitKey = `rate_limit_${clientIP}`;
    
    // Check if we have rate limiting storage
    if (env.CHAT_KV) {
      const lastRequest = await env.CHAT_KV.get(rateLimitKey);
      const now = Date.now();
      
      if (lastRequest) {
        const timeSinceLastRequest = now - parseInt(lastRequest);
        if (timeSinceLastRequest < 2000) { // 2 second rate limit
          return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please wait before sending another message.' }), {
            status: 429,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
      
      // Update rate limit
      await env.CHAT_KV.put(rateLimitKey, now.toString(), { expirationTtl: 60 });
    }

    // Validate message content (basic security)
    if (message.length > 500) {
      return new Response(JSON.stringify({ error: 'Message too long. Please keep messages under 500 characters.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Build conversation context
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversation.slice(-10), // Keep last 10 messages for context
      { role: 'user', content: message }
    ];

    // Call Cloudflare AI
    const response = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
      messages,
      max_tokens: 300,
      temperature: 0.7,
      top_p: 0.9
    });

    if (!response || !response.response) {
      throw new Error('Invalid AI response');
    }

    const aiMessage = response.response.trim();

    // Basic content filtering to ensure on-topic responses
    const offTopicIndicators = [
      'I cannot help with that',
      'I don\'t know about that',
      'That\'s outside my expertise',
      'I\'m not sure about'
    ];

    let filteredMessage = aiMessage;
    
    // If the response seems off-topic, provide a redirect
    if (offTopicIndicators.some(indicator => aiMessage.toLowerCase().includes(indicator.toLowerCase()))) {
      filteredMessage = "I can only help with questions about AstroPraxis Consulting services and team. What would you like to know about our equity consulting, AI development, drone operations, instructional design, or other services?";
    }

    return new Response(JSON.stringify({ 
      message: filteredMessage,
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    return new Response(JSON.stringify({ 
      error: 'I\'m having trouble responding right now. Please try again in a moment or contact us directly at hello@astropraxis.cc'
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

// Handle CORS preflight requests
export async function onRequestOptions() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  });
}