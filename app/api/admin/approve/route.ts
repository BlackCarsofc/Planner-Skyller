import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const admin = await requireAdmin();
    const formData = await request.formData();
    const paymentId = String(formData.get("paymentId") ?? "");
    const userId = String(formData.get("userId") ?? "");

    if (!paymentId || !userId) {
      return NextResponse.json({ error: "paymentId e userId são obrigatórios." }, { status: 400 });
    }

    await prisma.$transaction([
      prisma.payment.update({
        where: { id: paymentId },
        data: { status: "APPROVED" },
      }),
      prisma.premiumAccess.upsert({
        where: { userId },
        update: {
          active: true,
          approvedBy: admin.id,
          approvedAt: new Date(),
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
        create: {
          userId,
          active: true,
          approvedBy: admin.id,
          approvedAt: new Date(),
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      }),
    ]);

    return NextResponse.redirect(new URL("/admin", process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"));
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Erro ao aprovar acesso." }, { status: 400 });
  }
}
