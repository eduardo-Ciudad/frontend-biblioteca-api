const API_URL = "http://localhost:8080";

// ── LOGIN ─────────────────────────────────────────
// Chama POST /auth/login e salva o token no localStorage
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
  // O backend retorna { token: "..." } via LoginResponse
  const token = data.token ?? data;
  localStorage.setItem("token", token);
  return token;
}

// ── REGISTER ──────────────────────────────────────
// Chama POST /usuarios para criar a conta
// Nota: o endpoint /usuarios exige que o backend tenha liberado
// essa rota sem autenticação no SecurityConfig (permitAll para POST /usuarios)
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

// ── GUARD ─────────────────────────────────────────
// Chame no início de cada página protegida
export function requireAuth() {
  const token = getToken();
  if (!token) {
    window.location.href = "login.html";
    return false;
  }
  return true;
}