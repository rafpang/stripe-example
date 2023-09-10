import { NextResponse } from "next/server";
import { StripeICNObject } from "../(helpers)/stripeInitializer";

const stripe = StripeICNObject;

export async function POST(request: Request) {
  try {
    let data = await request.json();
    let priceId = data.priceId;
    const session = await stripe.checkout.sessions.create({
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

    // console.log(session);
    // stripeId    Int   @id @default(autoincrement())
    // audienceName String
    // seatType String
    // email String @unique

    return NextResponse.json(session.url);
  } catch (err) {
    console.log(err);
  }
}
