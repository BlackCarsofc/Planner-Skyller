import { prisma } from "../lib/prisma";
import { hashPassword } from "../lib/auth";

async function main() {
  const adminEmail = "admin@planner.com";
  const userEmail = "user@planner.com";

  const adminHash = await hashPassword("123456");
  const userHash = await hashPassword("123456");

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "Admin Planner",
      email: adminEmail,
      passwordHash: adminHash,
      role: "ADMIN",
      premiumAccess: {
        create: {
          active: true,
          approvedAt: new Date(),
        },
      },
    },
  });

  const user = await prisma.user.upsert({
    where: { email: userEmail },
    update: {},
    create: {
      name: "Usuário Planner",
      email: userEmail,
      passwordHash: userHash,
      role: "USER",
      premiumAccess: {
        create: {
          active: false,
        },
      },
      plannerEntries: {
        create: [
          {
            title: "Meta do ano",
            content: "Organizar vida financeira e rotina semanal.",
            type: "GOAL",
            month: "JAN",
            premiumOnly: true,
          },
          {
            title: "Datas importantes",
            content: "Aniversário da família e viagem de julho.",
            type: "CALENDAR",
            month: "JUL",
          },
        ],
      },
    },
  });

  await prisma.payment.create({
    data: {
      userId: user.id,
      provider: "PIX",
      status: "PENDING",
      amountInCents: 2990,
      currency: "BRL",
      qrCodeText: "000201010211...CONFIGURAR_DEPOIS",
      metadataJson: JSON.stringify({ note: "Pagamento aguardando aprovação admin" }),
    },
  });

  console.log({ admin: admin.email, user: user.email });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
