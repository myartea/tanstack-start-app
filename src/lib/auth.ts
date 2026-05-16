const KEY = "hp_auth";
export const ADMIN_USER = "admindtu";
export const ADMIN_PASS = "dartek2026";

export function login(u: string, p: string) {
  if (u === ADMIN_USER && p === ADMIN_PASS) {
    if (typeof window !== "undefined") localStorage.setItem(KEY, "1");
    return true;
  }
  return false;
}
export function logout() {
  if (typeof window !== "undefined") localStorage.removeItem(KEY);
}
export function isAuthed() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(KEY) === "1";
}
