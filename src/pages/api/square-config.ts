import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  try {
    // Get Square Application ID from environment variables
    const applicationId = process.env.SQUARE_APPLICATION_ID;
    const environment = process.env.SQUARE_ENVIRONMENT || 'sandbox';

    if (!applicationId) {
      return new Response(
        JSON.stringify({ error: 'Square Application ID not configured' }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }

    // Only return the application ID (public information)
    // Never expose access tokens or other sensitive data
    return new Response(
      JSON.stringify({
        applicationId,
        environment,
        sdkUrl: environment === 'production' 
          ? 'https://web.squarecdn.com/v1/square.js'
          : 'https://sandbox-web.squarecdn.com/v1/square.js'
      }),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
        } 
      }
    );
  } catch (error) {
    console.error('Square config error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to get Square configuration' }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
};