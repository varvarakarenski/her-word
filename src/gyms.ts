import { mockGyms } from "./data/gyms";
import { renderList } from "./renderList";
import { filterListings } from "./search";
import { initListControls } from "./listControls";
import { appendAddition, loadAdditions } from "./storage";
import { bindOverlayDismiss } from "./overlay";
import { initTagPicker, uniqueTags } from "./tagPicker";
import "./menubar";
import type { Gym } from "./types";
import { auth } from "./firebase";
import { onAuthStateChanged } from "@firebase/auth";

const addSubmit = document.querySelector<HTMLButtonElement>(".add-listing-submit");
const listContainer = document.querySelector<HTMLDivElement>(".perfect-gyms");
const searchInput = document.querySelector<HTMLInputElement>(".search-input");
const addToggle = document.querySelector<HTMLButtonElement>(".add-listing-toggle");
const addOverlay = document.querySelector<HTMLDivElement>(".add-listing-overlay");
const addForm = document.querySelector<HTMLFormElement>(".add-listing-form");
const tagPickerEl = document.querySelector<HTMLDivElement>(".tag-picker");

if (addOverlay) bindOverlayDismiss(addOverlay);
const tagPicker = tagPickerEl ? initTagPicker(tagPickerEl, uniqueTags(mockGyms)) : null;

onAuthStateChanged(auth, (user) => {
  if (addSubmit) addSubmit.textContent = user ? "Add gym" : "Sign in to add a gym";
});

if (listContainer) {
  let gyms: Gym[] = [...mockGyms];
  let query = "";
  const controls = initListControls(render);

  function render(): void {
    renderList(listContainer!, controls.apply(filterListings(gyms, query)), "gym", (gym) => gym.gymType);
  }

  loadAdditions<Gym>("gyms").then((additions) => {
    gyms = [...mockGyms, ...additions];
    render();
  });

  searchInput?.addEventListener("input", () => {
    query = searchInput.value;
    render();
  });

  addToggle?.addEventListener("click", () => {
    if (addOverlay) addOverlay.hidden = false;
  });

  addForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!auth.currentUser) {
          location.href = "login.html";
          return;
    }
        
    const data = new FormData(addForm);

    const gym: Gym = {
      id: crypto.randomUUID(),
      name: String(data.get("name") ?? "").trim(),
      description: String(data.get("description") ?? "").trim(),
      location: String(data.get("location") ?? "").trim(),
      tags: String(data.get("tags") ?? "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      gymType: String(data.get("gymType") ?? "").trim(),
      logoUrl: String(data.get("logoUrl") ?? "").trim() || undefined,
    };

    await appendAddition("gyms", gym);
    gyms.push(gym);
    addForm.reset();
    tagPicker?.reset();
    if (addOverlay) addOverlay.hidden = true;
    render();
  });

  render();
}
