'use client';

import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

export default function CheckoutForm({ amount, credits }: { amount: number, credits: number }) {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    // Confirm the payment
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/?success=true&credits=${credits}`,
      },
    });

    if (error) {
      setErrorMessage(error.message ?? '알 수 없는 오류가 발생했습니다.');
    }
    
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-6">
      <PaymentElement />
      
      {errorMessage && (
        <div className="text-red-500 text-sm p-3 bg-red-50 rounded-lg">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full py-4 rounded-xl font-bold text-center transition-colors bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? '결제 진행 중...' : `결제하기 (₩${amount.toLocaleString()})`}
      </button>
    </form>
  );
}
