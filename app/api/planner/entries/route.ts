import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { plannerEntrySchema } from "@/lib/validators";

export async function GET() {
  try {
    const user = await requireUser();
    const entries = await prisma.plannerEntry.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ entries });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Erro ao listar entradas." }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    const body = plannerEntrySchema.parse(await request.json());

    const premium = await prisma.premiumAccess.findUnique({ where: { userId: user.id } });
    if (body.premiumOnly && !premium?.active) {
      return NextResponse.json({ error: "Seu plano premium não está ativo." }, { status: 403 });
    }

    const entry = await prisma.plannerEntry.create({
      data: {
        userId: user.id,
        title: body.title,
        content: body.content,
        type: body.type,
        month: body.month,
        premiumOnly: body.premiumOnly,
      },
    });

    return NextResponse.json({ entry }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Erro ao salvar entrada." }, { status: 400 });
  }
}
