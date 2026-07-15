import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-06-24.dahlia',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  let event: Stripe.Event;

  try {
    if (!sig || !endpointSecret) {
      throw new Error('Missing stripe signature or endpoint secret');
    }
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed.`, err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      
      const userId = paymentIntent.metadata.userId;
      const creditsToAdd = parseInt(paymentIntent.metadata.credits || '0', 10);

      if (!userId || creditsToAdd <= 0) {
        console.error('Invalid metadata in payment intent:', paymentIntent.metadata);
        break;
      }

      // Initialize Supabase admin client to bypass RLS and update credits safely
      // Use service_role key if available, otherwise anon key (but anon key might be blocked by RLS)
      const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false
          }
        }
      );

      try {
        // Fetch current credits
        const { data: profile, error: fetchError } = await supabaseAdmin
          .from('profiles')
          .select('credits')
          .eq('id', userId)
          .single();

        if (fetchError || !profile) {
          console.error(`Failed to fetch profile for user ${userId}:`, fetchError);
          break;
        }

        const newCredits = (profile.credits || 0) + creditsToAdd;

        // Update credits
        const { error: updateError } = await supabaseAdmin
          .from('profiles')
          .update({ credits: newCredits })
          .eq('id', userId);

        if (updateError) {
          console.error(`Failed to update credits for user ${userId}:`, updateError);
          break;
        }

        console.log(`Successfully added ${creditsToAdd} credits to user ${userId}. New total: ${newCredits}`);
      } catch (e) {
        console.error('Error updating credits in Supabase:', e);
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
