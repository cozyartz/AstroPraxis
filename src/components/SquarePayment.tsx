import React, { useEffect, useState } from 'react';

interface SquarePaymentProps {
  amount: number;
  onPaymentSuccess: (paymentResult: any) => void;
  onPaymentFailure: (error: any) => void;
}

export default function SquarePayment({ amount, onPaymentSuccess, onPaymentFailure }: SquarePaymentProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [card, setCard] = useState<any>(null);
  const [payments, setPayments] = useState<any>(null);

  useEffect(() => {
    const loadSquarePayments = async () => {
      if (!window.Square) {
        // Load Square SDK - check if we're in sandbox or production
        const script = document.createElement('script');
        script.src = 'https://sandbox-web.squarecdn.com/v1/square.js'; // Default to sandbox
        script.async = true;
        script.onload = initializeSquare;
        script.onerror = () => {
          console.error('Failed to load Square SDK');
          setIsLoading(false);
          onPaymentFailure(new Error('Failed to load payment system'));
        };
        document.body.appendChild(script);
      } else {
        initializeSquare();
      }
    };

    const initializeSquare = async () => {
      try {
        // Get application ID from server or use environment variable
        const appId = await getSquareApplicationId();
        
        if (!appId) {
          throw new Error('Square Application ID not configured');
        }

        // Initialize Square Payments
        const paymentsInstance = window.Square.payments(appId, 'sandbox');
        setPayments(paymentsInstance);
        
        const cardOptions = {
          style: {
            input: {
              fontSize: '16px',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              color: '#374151',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '2px solid #e5e7eb',
              padding: '16px',
              lineHeight: '1.5',
              transition: 'border-color 0.3s ease',
            },
            'input:focus': {
              borderColor: '#3b82f6',
              outline: 'none',
              boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
            },
            'input.is-error': {
              borderColor: '#ef4444',
            },
            '.message-text': {
              color: '#ef4444',
              fontSize: '14px',
              marginTop: '8px',
            },
            '.message-text.is-error': {
              color: '#ef4444',
            },
            '.message-text.is-success': {
              color: '#10b981',
            },
          },
        };

        const cardElement = await paymentsInstance.card(cardOptions);
        await cardElement.attach('#card-container');
        setCard(cardElement);
        setIsLoading(false);
      } catch (error) {
        console.error('Square initialization error:', error);
        setIsLoading(false);
        onPaymentFailure(error);
      }
    };

    loadSquarePayments();
  }, []);

  const getSquareApplicationId = async (): Promise<string | null> => {
    try {
      // Try to get from server endpoint (more secure)
      const response = await fetch('/api/square-config');
      if (response.ok) {
        const config = await response.json();
        return config.applicationId;
      }
    } catch (error) {
      console.warn('Could not fetch Square config from server:', error);
    }

    // Fallback - you would set this in your environment
    // For security, this should ideally come from the server
    return 'sandbox-sq0idb-YOUR_APPLICATION_ID'; // Replace with your actual Application ID
  };

  const handlePayment = async () => {
    if (!card || !payments || isProcessing) return;

    setIsProcessing(true);

    try {
      const result = await card.tokenize();
      
      if (result.status === 'OK') {
        // Send token to your server for payment processing
        const paymentResponse = await fetch('/api/process-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sourceId: result.token,
            amount: Math.round(amount * 100), // Convert to cents and ensure integer
            currency: 'USD',
          }),
        });

        if (paymentResponse.ok) {
          const paymentResult = await paymentResponse.json();
          onPaymentSuccess(paymentResult);
        } else {
          const errorData = await paymentResponse.json();
          throw new Error(errorData.error || 'Payment processing failed');
        }
      } else {
        const errorMessage = result.errors?.[0]?.message || 'Payment tokenization failed';
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Payment error:', error);
      onPaymentFailure(error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600 mx-auto"></div>
          <span className="text-neutral-600 font-medium">Loading secure payment form...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="card-modern p-8">
        <h3 className="text-2xl font-bold text-neutral-900 mb-6 gradient-text">
          Payment Information
        </h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-base font-semibold text-neutral-700 mb-3">
              Card Details
            </label>
            <div 
              id="card-container" 
              className="w-full min-h-[60px] rounded-xl border-2 border-neutral-200 bg-white transition-all duration-300"
            ></div>
          </div>
          
          <div className="glass-light rounded-2xl p-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-neutral-700">Total Amount:</span>
              <span className="text-3xl font-bold gradient-text">${amount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handlePayment}
        disabled={isProcessing || isLoading}
        className={`w-full btn-accent text-xl py-6 ${
          isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover-glow animate-shine'
        }`}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent mr-3"></div>
            Processing Payment...
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Pay ${amount.toFixed(2)} Securely
          </div>
        )}
      </button>

      <div className="text-center">
        <div className="glass-light rounded-xl p-4 inline-flex items-center space-x-2">
          <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="text-sm text-neutral-600 font-medium">
            Secured by Square with 256-bit SSL encryption
          </span>
        </div>
      </div>
    </div>
  );
}

// Add Square SDK types
declare global {
  interface Window {
    Square: any;
  }
}