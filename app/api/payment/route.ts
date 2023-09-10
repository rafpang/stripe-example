import { NextResponse } from "next/server";
import { StripeICNObject } from "../(helpers)/stripeInitializer";

export async function POST(request: Request) {
  try {
    let data = await request.json();
    let priceId = data.priceId;
    const session = await StripeICNObject.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000",
      cancel_url: "http://localhost:3000",
    });

    return NextResponse.json(session.url);
  } catch (err) {
    console.log(err);
  }
}
