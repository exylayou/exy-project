/**
 * Netlify Function: Gemini AI Chat
 * Handles chat requests using Google's Gemini AI
 *
 * Environment variables required:
 * - GEMINI_API_KEY: Google AI Studio API key
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');

// System prompt for Island Concierge AI
const SYSTEM_PROMPT = `You are an expert Island Concierge AI assistant for Saint Vincent and the Grenadines (SVG).

Your role:
- Help tourists discover attractions, beaches, restaurants, and activities in SVG
- Provide insider tips and local knowledge
- Suggest tours and experiences based on user interests
- Give practical travel advice (weather, transport, safety)
- Be friendly, enthusiastic, and helpful

Key information about SVG:
- Capital: Kingstown on St. Vincent island
- Popular islands: Bequia, Mustique, Tobago Cays, Canouan
- Top attractions: La Soufriere volcano, Tobago Cays Marine Park, Falls of Baleine
- Activities: Sailing, snorkeling, diving, hiking, whale watching
- Culture: Caribbean, friendly locals, reggae music, fresh seafood

Ferry Services in SVG:
- Bequia Express: https://bequiaexpress.com/schedules/
  * Fast ferry service between St. Vincent and Bequia
  * Multiple daily departures
- Bequia Fast Ferries: https://bequiafastferries.com/schedule
  * Additional ferry option to Bequia
  * Check schedule for departure times
- Admiralty Transport: https://www.admiralty-transport.com/
  * Inter-island ferry service
  * Serves multiple Grenadine islands

Guidelines:
- Keep responses conversational and concise (2-3 paragraphs max)
- Always mention specific locations when relevant
- Suggest booking tours through the app when appropriate
- If you don't know something, be honest and suggest alternatives
- Use a warm, Caribbean-friendly tone

Never:
- Make up facts about SVG
- Give medical or legal advice
- Discuss politics or controversial topics
- Recommend activities outside SVG`;

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse request body
    const { message, conversationHistory = [] } = JSON.parse(event.body);

    if (!message || typeof message !== 'string') {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Message is required' })
      };
    }

    // Check for API key
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY environment variable is not set');
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'API configuration error',
          details: 'GEMINI_API_KEY is not configured'
        })
      };
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Build conversation context
    const conversationContext = conversationHistory
      .map(msg => `${msg.isAI ? 'Assistant' : 'User'}: ${msg.message}`)
      .join('\n');

    const fullPrompt = `${SYSTEM_PROMPT}

${conversationContext ? `Previous conversation:\n${conversationContext}\n` : ''}
User: ${message}
Assistant:`;

    // Generate response
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const aiResponse = response.text();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Adjust for production
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({
        message: aiResponse,
        timestamp: new Date().toISOString()
      })
    };

  } catch (error) {
    console.error('Gemini AI Error:', error);

    // Handle specific error types
    if (error.message?.includes('API key')) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid API key' })
      };
    }

    if (error.message?.includes('quota')) {
      return {
        statusCode: 429,
        body: JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' })
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to generate response',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  }
};
