import Stripe from "stripe";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
      apiVersion: "2023-08-16",
    });
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
    const user = await prisma.audience.create({
      data: {
        stripeId: session.id,
        audienceName: "pang",
        seatType: "pang",
        email: "pang@example.com",
      },
    });

    return NextResponse.json(session.url);
  } catch (err) {
    console.log(err);
  }
}
