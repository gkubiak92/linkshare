import { z } from "@/lib/validators/validators";

export const addEntryCommonSchema = {
  title: z.string().max(128, { message: "tooLong" }),
  description: z.string().max(256, { message: "tooLong" }),
  url: z.string().url({ message: "invalidFormat" }),
  thumbnailUrl: z.string().url({ message: "invalidFormat" }),
};

export const schema = z.object({
  ...addEntryCommonSchema,
  tags: z.array(
    z.object({
      label: z.string(),
      value: z.string().or(z.number()).nullable(),
    }),
  ),
});
