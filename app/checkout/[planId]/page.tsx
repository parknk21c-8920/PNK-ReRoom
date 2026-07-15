'use client';

import React, { useEffect, useState, use } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Header from '@/components/Header';
import CheckoutForm from '@/components/CheckoutForm';
import { supabase } from '@/lib/supabase';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const plans = {
  plan_10: { price: 2990, name: '베이직 (10장)', credits: 10 },
  plan_50: { price: 13990, name: '프로 (50장)', credits: 50 },
  plan_100: { price: 25000, name: '프리미엄 (100장)', credits: 100 },
};

export default function CheckoutPage({ params }: { params: Promise<{ planId: string }> }) {
  const { planId } = use(params);
  const plan = plans[planId as keyof typeof plans];

  const [clientSecret, setClientSecret] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!plan) return;
    
    const fetchClientSecret = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setErrorMsg('로그인이 필요합니다.');
        return;
      }

      try {
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`
          },
          body: JSON.stringify({ planId }),
        });
        
        const data = await res.json();
        
        if (!res.ok) {
          setErrorMsg(data.error || '결제 준비 중 오류가 발생했습니다.');
          return;
        }
        
        setClientSecret(data.clientSecret);
      } catch (err: any) {
        setErrorMsg(err.message);
      }
    };

    fetchClientSecret();
  }, [planId, plan]);

  if (!plan) {
    return (
      <div className="min-h-screen bg-paper flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p>잘못된 접근입니다.</p>
        </main>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="min-h-screen bg-paper flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center flex-col gap-4">
          <p className="text-red-500 font-bold">{errorMsg}</p>
          <a href="/pricing" className="px-4 py-2 bg-ink text-white rounded-lg">돌아가기</a>
        </main>
      </div>
    );
  }

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#10b981', // emerald-500
    },
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-display font-bold text-ink mb-4">
            결제하기
          </h1>
          <p className="text-ink-soft text-lg">
            {plan.name} 요금제를 선택하셨습니다.
          </p>
        </div>

        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg border border-line">
          {clientSecret ? (
            <Elements options={{ clientSecret, appearance }} stripe={stripePromise}>
              <CheckoutForm amount={plan.price} credits={plan.credits} />
            </Elements>
          ) : (
            <div className="flex justify-center items-center h-48">
              <p className="text-ink-soft">결제 모듈을 불러오는 중...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
