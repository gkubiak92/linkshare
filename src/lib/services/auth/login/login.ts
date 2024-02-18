import { db } from "@/db";
import { User } from "@/lib/services/users/types";
import { cookies } from "next/headers";
import { comparePassword, encrypt } from "@/lib/services/auth/utils";

export type LoginParams = {
  email: string;
  password: string;
};

export type LoginErrors = "INVALID_CREDENTIALS";

export type LoginResponse = {
  user: User | null;
  error?: LoginErrors;
};

export async function login({
  email,
  password,
}: LoginParams): Promise<LoginResponse> {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });

  if (user) {
    const { password: hashedPassword, ...userData } = user;
    const isCorrect = await comparePassword(password, hashedPassword);

    if (!isCorrect) {
      return {
        user: null,
        error: "INVALID_CREDENTIALS",
      };
    }

    const session = await encrypt({ user: userData });
    cookies().set("session", session, { httpOnly: true });

    return {
      user: userData,
    };
  }

  return {
    user: null,
    error: "INVALID_CREDENTIALS",
  };
}
