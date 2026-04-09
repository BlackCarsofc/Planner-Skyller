import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const plannerEntrySchema = z.object({
  title: z.string().min(2),
  content: z.string().min(1),
  type: z.enum(["CALENDAR", "GOAL", "FINANCE", "READING", "TRAVEL", "ROUTINE", "NOTE"]),
  month: z.string().optional(),
  premiumOnly: z.boolean().optional().default(false),
});

export const paymentIntentSchema = z.object({
  provider: z.enum(["PIX", "PAYPAL", "STRIPE"]),
  amountInCents: z.number().int().positive(),
  currency: z.string().default("BRL"),
});
