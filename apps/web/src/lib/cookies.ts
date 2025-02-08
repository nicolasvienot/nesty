import { cookies } from "next/headers";
import { Theme } from "@/types/theme";

export async function getThemeCookie() {
  const cookieStore = await cookies();
  return cookieStore.get("theme")?.value as Theme;
}
