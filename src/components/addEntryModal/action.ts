"use server";

import {
  createLinkEntry,
  CreateLinkEntryParams,
  CreateLinkEntryResponse as CreateLinkEntryQueryResponse,
} from "@/lib/services/linkEntries/createLinkEntry";
import z, { ZodError } from "zod";
import { revalidateTag } from "next/cache";
import { addEntryCommonSchema } from "./schema";

type CreateEntryParams = CreateLinkEntryParams;

type CreateEntryResponse =
  | {
      status: "success";
      data: CreateLinkEntryQueryResponse["data"];
    }
  | {
      status: "failed";
      error: ZodError;
    };

const schema = z.object({
  ...addEntryCommonSchema,
  tags: z.object({
    chosen: z.array(z.string()),
    added: z.array(z.string()).optional(),
  }),
});

export async function createEntry(
  entry: CreateEntryParams,
): Promise<CreateEntryResponse> {
  const parsedResult = schema.safeParse(entry);

  if (!parsedResult.success) {
    return {
      status: "failed",
      error: parsedResult.error,
    };
  }

  const { data } = await createLinkEntry(entry);

  revalidateTag("linkEntries");

  return {
    status: "success",
    data,
  };
}
