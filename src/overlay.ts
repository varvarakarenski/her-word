import { auth } from "./firebase";

export function bindOverlayDismiss(overlay: HTMLElement): void {
  const closeBtn = overlay.querySelector<HTMLButtonElement>(".overlay-close");
  closeBtn?.addEventListener("click", () => {
    overlay.hidden = true;
  });

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) overlay.hidden = true;
  });
}

// Returns true if signed in; otherwise sends the user to the login page.
export function requireLogin(): boolean {
  if (auth.currentUser) return true;
  location.href = "login.html";
  return false;
}
