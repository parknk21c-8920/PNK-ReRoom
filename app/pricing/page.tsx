'use client';

import React from 'react';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
  const plans = [
    {
      id: 'plan_10',
      name: '베이직',
      images: 10,
      price: '2,990',
      description: '가볍게 인테리어를 테스트해보고 싶은 분',
    },
    {
      id: 'plan_50',
      name: '프로',
      images: 50,
      price: '13,990',
      description: '여러 가지 스타일을 다양하게 비교해보고 싶은 분',
      popular: true,
    },
    {
      id: 'plan_100',
      name: '프리미엄',
      images: 100,
      price: '25,000',
      description: '전문가처럼 마음껏 인테리어를 생성하고 싶은 분',
    },
  ];

  const router = useRouter();

  const handleCheckout = (planId: string) => {
    router.push(`/checkout/${planId}`);
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-display font-bold text-ink md:text-5xl mb-4">
            원하는 만큼만, 합리적으로.
          </h1>
          <p className="text-ink-soft text-sm md:text-lg">
            크레딧이 모두 소진되셨나요? 나에게 맞는 요금제를 선택해 보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`relative rounded-3xl p-8 flex flex-col justify-between ${
                plan.popular 
                  ? 'bg-ink text-white shadow-2xl scale-105 border-2 border-emerald-500' 
                  : 'bg-white text-ink border border-line shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                  가장 인기있는 선택
                </div>
              )}
              
              <div>
                <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-ink'}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-display font-bold">₩{plan.price}</span>
                </div>
                <div className={`text-sm mb-6 pb-6 border-b ${plan.popular ? 'border-gray-700' : 'border-line'}`}>
                  {plan.description}
                </div>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <span className="text-emerald-500">✔️</span>
                    <span className="font-semibold">{plan.images}장 생성 가능 ({plan.images} Credits)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-emerald-500">✔️</span>
                    <span>모든 스타일 사용 가능</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-emerald-500">✔️</span>
                    <span>고화질 다운로드</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => handleCheckout(plan.id)}
                  className={`w-full py-4 rounded-xl font-bold text-center transition-colors ${
                    plan.popular 
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                      : 'bg-ink text-white hover:bg-ink-soft'
                  }`}
                >
                  선택하기
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 기타 결제 수단 더미 UI */}
        <div className="mt-16 text-center">
          <p className="text-xs text-ink-soft mb-4">지원하는 결제 수단 (추후 연결 예정)</p>
          <div className="flex items-center justify-center gap-4 opacity-50 grayscale">
            <span className="px-4 py-2 bg-yellow-300 text-black font-bold rounded-lg text-xs">KakaoPay</span>
            <span className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg text-xs">PayPal</span>
            <span className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg text-xs">Toss</span>
            <span className="px-4 py-2 bg-indigo-500 text-white font-bold rounded-lg text-xs">Stripe</span>
          </div>
        </div>
      </main>
    </div>
  );
}
