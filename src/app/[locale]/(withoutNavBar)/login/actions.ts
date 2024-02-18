"use server";

import { login } from "@/lib/services/auth/login/login";
import { redirect } from "@/i18n/navigation";
import { routes } from "@/routes";

export async function onSubmit(prevState: any, formData: FormData) {
  const credentials = {
    email: String(formData.get("email")),
    password: String(formData.get("password")),
  };

  const { user, error } = await login(credentials);

  if (user) {
    redirect(routes.root);
  }

  return error;
}
