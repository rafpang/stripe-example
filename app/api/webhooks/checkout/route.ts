import { headers } from "next/headers";
import Stripe from "stripe";
import { StripeICNObject } from "../../(helpers)/stripeInitializer";
import { insertToAudienceTable } from "../../(helpers)/databaseFunctions";
import { Audience } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // rafpang: Stripe requires raw body for webhooks
  const body = await req.text();
  const signature: string = headers().get("Stripe-Signature") as string;

  try {
    const event: Stripe.Event = StripeICNObject.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
    if (event.type === "payment_intent.succeeded") {
      const audienceData: Audience = {
        // rafpang: TypeScript Error when accessing id property of event.data.object, need to cast as any
        stripeId: (event as any).data.object.id,
        audienceName: "pang",
        seatType: "pangSeat",
        email: "pangLagi@pang.com",
      };

      await insertToAudienceTable(audienceData);
      return NextResponse.json({ paymentStatus: "success" }, { status: 200 });
    }
  } catch (error: any) {
    // rafpang: Error needs to be type any for try catch block
    return NextResponse.json(
      { paymentStatus: `Webhook Error: ${error.message}` },
      { status: 400 }
    );
  }
}
