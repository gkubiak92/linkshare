import { redirect } from "@/i18n/navigation";
import { routes } from "@/routes";

export default function Page() {
  return redirect(routes.links.root);
}
