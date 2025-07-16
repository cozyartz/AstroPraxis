import type { APIRoute } from 'astro';
import { Client, Environment } from 'squareup';

// Get environment configuration
const getSquareEnvironment = () => {
  const env = process.env.SQUARE_ENVIRONMENT || 'sandbox';
  return env === 'production' ? Environment.Production : Environment.Sandbox;
};

// Initialize Square client
const getSquareClient = () => {
  const accessToken = process.env.SQUARE_ACCESS_TOKEN;
  
  if (!accessToken || accessToken === 'your_square_access_token_here') {
    throw new Error('Square Access Token not configured');
  }

  return new Client({
    accessToken,
    environment: getSquareEnvironment(),
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const { sourceId, amount, currency = 'USD' } = await request.json();

    if (!sourceId || !amount) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: sourceId and amount are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate amount
    if (typeof amount !== 'number' || amount <= 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid amount: must be a positive number' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get Square client
    const client = getSquareClient();
    const { paymentsApi } = client;

    // Create payment request
    const paymentRequest = {
      sourceId,
      amountMoney: {
        amount: BigInt(amount),
        currency,
      },
      idempotencyKey: crypto.randomUUID(),
    };

    // Process payment
    const { result, statusCode } = await paymentsApi.createPayment(paymentRequest);

    if (statusCode === 200) {
      return new Response(
        JSON.stringify({
          success: true,
          paymentId: result.payment?.id,
          receiptUrl: result.payment?.receiptUrl,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      throw new Error('Payment failed');
    }
  } catch (error) {
    console.error('Payment processing error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Payment processing failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};