import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-08-16",
});

export async function GET(request: Request) {
  const prices = await stripe.prices.list({
    limit: 4,
  });

  return NextResponse.json(prices.data.reverse());
}
