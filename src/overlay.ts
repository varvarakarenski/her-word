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

let loginPrompt: HTMLDivElement | null = null;

// Returns true if signed in; otherwise shows a "log in or sign up" prompt.
export function requireLogin(): boolean {
  if (auth.currentUser) return true;
  if (!loginPrompt) {
    loginPrompt = document.createElement("div");
    loginPrompt.className = "overlay-backdrop";
    loginPrompt.innerHTML = `
      <div class="overlay-panel">
        <button type="button" class="overlay-close">✕</button>
        <h2>Log in to continue</h2>
        <p>You need an account to add places and write reviews.</p>
        <a href="login.html" class="landing-page-btn">Log in or sign up</a>
      </div>`;
    document.body.appendChild(loginPrompt);
    bindOverlayDismiss(loginPrompt);
  }
  loginPrompt.hidden = false;
  return false;
}
