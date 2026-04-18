// ── TOAST ────────────────────────────────────────
export function toast(msg, type = "success") {
  const container = document.getElementById("toast-container");
  const el = document.createElement("div");
  el.className = `toast toast-${type}`;
  el.innerHTML = `<span class="toast-icon">${type === "success" ? "✓" : "✕"}</span><span>${msg}</span>`;
  container.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

// ── ACTIVE NAV ───────────────────────────────────
export function setActiveNav() {
  const page = location.pathname.split("/").pop();
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === page);
  });
}

// ── FORMAT DATE ──────────────────────────────────
export function fmtDate(str) {
  if (!str) return "—";
  const d = new Date(str);
  return d.toLocaleDateString("pt-BR");
}