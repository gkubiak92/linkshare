"use server";

import {
  createLinkEntry,
  CreateLinkEntryParams,
} from "@/lib/services/linkEntries/createLinkEntry";
import { revalidateTag } from "next/cache";
import { schema } from "./schema";

type CreateEntryParams = CreateLinkEntryParams;

export async function createEntry(entry: CreateEntryParams) {
  const parsedResult = schema.safeParse(entry);

  if (!parsedResult.success) {
    return {
      data: null,
      error: parsedResult.error,
    };
  }

  const result = await createLinkEntry(entry);

  revalidateTag("linkEntries");

  return result;
}
