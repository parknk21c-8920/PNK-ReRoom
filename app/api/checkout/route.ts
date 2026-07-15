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
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }
    const token = authHeader.replace('Bearer ', '');

    let userId: string;
    try {
      const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
      userId = payload.sub;
    } catch (e) {
      return NextResponse.json({ error: '유효하지 않은 토큰입니다.' }, { status: 401 });
    }

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
        credits: plan.credits.toString(), // Stripe metadata values must be strings
        userId: userId
      }
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret, credits: plan.credits });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
