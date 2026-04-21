import { logout, requireAuth, getToken, getEmail, getRole, isAdmin } from "./auth.js";

// ── GUARD + INIT ──────────────────────────────────
export function initPage() {
  if (!requireAuth()) return;
  setActiveNav();
  injectAccountWidget();
}

// ── EXPOSE ROLE HELPERS ───────────────────────────
export { isAdmin, getRole };

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

// ── FORMAT DATE ───────────────────────────────────
export function fmtDate(str) {
  if (!str) return "—";
  const d = new Date(str);
  return d.toLocaleDateString("pt-BR");
}

// ── ACCOUNT WIDGET ────────────────────────────────
function injectAccountWidget() {
  const sidebar = document.querySelector(".sidebar");
  if (!sidebar || sidebar.querySelector(".sidebar-account")) return;

  const email = getEmail();
  const role = getRole();
  const initial = email.charAt(0).toUpperCase();
  const isAdminUser = role === "ADMIN";

  const widget = document.createElement("div");
  widget.className = "sidebar-account";
  widget.innerHTML = `
    <button class="account-trigger" aria-label="Menu da conta" aria-expanded="false">
      <div class="account-avatar ${isAdminUser ? "account-avatar--admin" : ""}">${initial}</div>
      <div class="account-info">
        <span class="account-email">${email}</span>
        <span class="account-role">${isAdminUser ? "Administrador" : "Usuário"}</span>
      </div>
      <svg class="account-chevron" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <polyline points="18 15 12 9 6 15"/>
      </svg>
    </button>
    <div class="account-dropdown" aria-hidden="true">
      <div class="account-dropdown-header">
        <div class="account-dropdown-avatar ${isAdminUser ? "account-avatar--admin" : ""}">${initial}</div>
        <div>
          <div class="account-dropdown-email">${email}</div>
          <div class="account-dropdown-badge ${isAdminUser ? "badge-role--admin" : "badge-role--user"}">
            ${isAdminUser ? "Admin" : "Usuário"}
          </div>
        </div>
      </div>
      <div class="account-dropdown-divider"></div>
      <button class="account-dropdown-item account-dropdown-logout">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
        Sair da conta
      </button>
    </div>
  `;

  sidebar.appendChild(widget);

  const trigger = widget.querySelector(".account-trigger");
  const dropdown = widget.querySelector(".account-dropdown");

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.contains("open");
    dropdown.classList.toggle("open", !isOpen);
    trigger.setAttribute("aria-expanded", String(!isOpen));
  });

  document.addEventListener("click", () => {
    dropdown.classList.remove("open");
    trigger.setAttribute("aria-expanded", "false");
  });

  widget.querySelector(".account-dropdown-logout").addEventListener("click", logout);
}