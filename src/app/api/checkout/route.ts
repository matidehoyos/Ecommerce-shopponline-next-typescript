import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { CartItem } from '../../../contexts/cartContext';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});

export async function POST(request: NextRequest) {
  const { cartItems }: { cartItems: CartItem[] } = await request.json();
  
  const lineItems = cartItems.map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.title,
        images: [item.thumbnail],
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.AUTH0_BASE_URL}`,
      cancel_url: `${process.env.AUTH0_BASE_URL}`,
    });

    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
