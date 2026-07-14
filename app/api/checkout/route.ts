import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-06-24.dahlia',
});

const plans = {
  plan_10: { price: 2990, name: '베이직 (10장)', credits: 10 },
  plan_50: { price: 13990, name: '프로 (50장)', credits: 50 },
  plan_100: { price: 25000, name: '프리미엄 (100장)', credits: 100 },
};

export async function POST(req: Request) {
  try {
    const { planId } = await req.json();
    const plan = plans[planId as keyof typeof plans];

    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: plan.price,
      currency: 'krw',
      description: `PNK Re-Room AI 인테리어 생성 ${plan.credits}회 이용권`,
      metadata: {
        planId: planId,
        credits: plan.credits
      }
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret, credits: plan.credits });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
