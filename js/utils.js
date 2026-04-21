import { logout, requireAuth } from "./auth.js";

// ── GUARD + INIT ──────────────────────────────────
// Chame no início de cada página protegida para bloquear acesso sem login
// e injetar o botão de logout no sidebar
export function initPage() {
  if (!requireAuth()) return; // redireciona se não autenticado
  setActiveNav();
  injectLogout();
}

// ── TOAST ─────────────────────────────────────────
export function toast(msg, type = "success") {
  const container = document.getElementById("toast-container");
  const el = document.createElement("div");
  el.className = `toast toast-${type}`;
  el.innerHTML = `<span class="toast-icon">${type === "success" ? "✓" : "✕"}</span><span>${msg}</span>`;
  container.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

// ── ACTIVE NAV ────────────────────────────────────
export function setActiveNav() {
  const page = location.pathname.split("/").pop();
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === page);
  });
}

// ── LOGOUT BUTTON ─────────────────────────────────
// Injeta o botão de sair na parte de baixo do sidebar
function injectLogout() {
  const sidebar = document.querySelector(".sidebar");
  if (!sidebar || sidebar.querySelector(".sidebar-logout")) return;

  const btn = document.createElement("button");
  btn.className = "sidebar-logout";
  btn.innerHTML = `
    <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
    <span>Sair</span>
  `;
  btn.addEventListener("click", logout);
  sidebar.appendChild(btn);
}

// ── FORMAT DATE ───────────────────────────────────
export function fmtDate(str) {
  if (!str) return "—";
  const d = new Date(str);
  return d.toLocaleDateString("pt-BR");
}