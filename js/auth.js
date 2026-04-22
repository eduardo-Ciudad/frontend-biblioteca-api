const API_URL = "https://biblioteca-api-nqwi.onrender.com";
//const API_URL = "http://localhost:8080";

// ── LOGIN ─────────────────────────────────────────
export async function login(email, senha) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => "");
    throw new Error(err || "Credenciais inválidas.");
  }

  const data = await res.json();
  const token = data.token ?? data;
  localStorage.setItem("token", token);
  return token;
}

// ── REGISTER ──────────────────────────────────────
export async function register(nome, email, senha) {
  const res = await fetch(`${API_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, senha }),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => "");
    throw new Error(err || "Erro ao criar conta.");
  }

  return res.json();
}

// ── LOGOUT ────────────────────────────────────────
export function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

// ── GET TOKEN ─────────────────────────────────────
export function getToken() {
  return localStorage.getItem("token");
}

// ── PARSE JWT PAYLOAD ─────────────────────────────
function parsePayload() {
  const token = getToken();
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

// ── GET EMAIL ─────────────────────────────────────
export function getEmail() {
  const p = parsePayload();
  return p?.sub ?? p?.email ?? "Usuário";
}

// ── GET ROLE ──────────────────────────────────────
// Retorna "ADMIN" ou "USER"
export function getRole() {
  const p = parsePayload();
  return p?.role ?? "USER";
}

// ── IS ADMIN ──────────────────────────────────────
export function isAdmin() {
  return getRole() === "ADMIN";
}

// ── REQUIRE AUTH ──────────────────────────────────
export function requireAuth() {
  if (!getToken()) {
    window.location.href = "login.html";
    return false;
  }
  return true;
}