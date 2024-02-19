"use server";

import { RegisterFormValues } from "./page";
import { register } from "@/lib/services/auth/register/register";
import { hashPassword } from "@/lib/services/auth/utils";

type OnSubmitParams = RegisterFormValues;

export async function onSubmit({
  password,
  repeatPassword,
  ...data
}: OnSubmitParams) {
  const hashedPassword = await hashPassword(password);

  const { user, error } = await register({
    ...data,
    password: hashedPassword,
  });

  return {
    user,
    error,
  };
}
