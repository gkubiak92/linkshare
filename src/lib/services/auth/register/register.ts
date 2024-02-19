import { User } from "@/lib/services/users/types";
import { RegisterFormValues } from "@/app/[locale]/(withoutNavBar)/register/page";
import { db } from "@/db";
import { users } from "@/db/schema";
import { getTableColumns } from "drizzle-orm";

type RegisterParams = Omit<RegisterFormValues, "repeatPassword">;

type RegisterErrors =
  | "PASSWORDS_DONT_MATCH"
  | "ALREADY_EXIST"
  | "COULD_NOT_CREATE_USER";

type RegisterResponse = {
  user: User | null;
  error?: RegisterErrors;
};

export async function register({
  email,
  password,
  username,
}: RegisterParams): Promise<RegisterResponse> {
  // @ts-ignore-next-line
  try {
    const result = await db
      .insert(users)
      .values({
        email,
        password,
        name: username,
      })
      .returning({ ...getTableColumns(users) });

    return {
      user: result[0],
    };
  } catch (e) {
    return {
      user: null,
      error: "COULD_NOT_CREATE_USER",
    };
  }
}
