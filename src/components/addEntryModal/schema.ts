import z from "zod";

export const schema = z.object({
  title: z.string().max(128, { message: "VALIDATION.TOO_LONG" }),
  description: z.string().max(256, { message: "VALIDATION.TOO_LONG" }),
  url: z.string().url({ message: "VALIDATION.NOT_AN_URL" }),
  thumbnailUrl: z.string().url({ message: "VALIDATION.NOT_AN_URL" }),
  tags: z.array(
    z.object({
      label: z.string(),
      value: z.string().or(z.number()).nullable(),
    }),
  ),
});
