import Stripe from "stripe";
import { NextResponse } from "next/server";
import { StripeICNObject } from "../(helpers)/stripeInitializer";

export async function GET(request: Request) {
  const prices = await StripeICNObject.prices.list({
    limit: 4,
  });

  return NextResponse.json(prices.data.reverse());
}
