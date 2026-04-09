import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { paymentIntentSchema } from "@/lib/validators";

function createMockPixPayload(amountInCents: number): { text: string; image: string } {
  const text = `PIX|AMOUNT=${(amountInCents / 100).toFixed(2)}|CONFIGURE_PROVIDER`; 
  const image = "data:image/svg+xml;base64,PHN2Zy8+";
  return { text, image };
}

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    const body = paymentIntentSchema.parse(await request.json());

    let qrCodeText: string | undefined;
    let qrCodeImage: string | undefined;
    let externalId: string | undefined;

    if (body.provider === "PIX") {
      const pix = createMockPixPayload(body.amountInCents);
      qrCodeText = pix.text;
      qrCodeImage = pix.image;
      externalId = `pix_${Date.now()}`;
    }

    if (body.provider === "PAYPAL") {
      externalId = `paypal_${Date.now()}`;
    }

    if (body.provider === "STRIPE") {
      externalId = `stripe_${Date.now()}`;
    }

    const payment = await prisma.payment.create({
      data: {
        userId: user.id,
        provider: body.provider,
        amountInCents: body.amountInCents,
        currency: body.currency,
        status: body.provider === "PIX" ? "PENDING" : "PENDING",
        externalId,
        qrCodeText,
        qrCodeImage,
        metadataJson: JSON.stringify({
          message: "Configure credenciais reais no backend para produção.",
        }),
      },
    });

    return NextResponse.json({ payment }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Erro ao criar pagamento." }, { status: 400 });
  }
}
