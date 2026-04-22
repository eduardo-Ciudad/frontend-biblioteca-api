import { getToken, logout } from "./auth.js";

const API_URL = "https://biblioteca-api-nqwi.onrender.com";// http://localhost:8080

// ── REQUEST BASE ──────────────────────────────────
// Injeta o token JWT em todas as requisições autenticadas
async function request(path, options = {}) {
  const token = getToken();

  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      // Se tiver token, manda no Authorization header
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });

  // Token expirado ou inválido → joga fora e manda pro login
  if (res.status === 401 || res.status === 403) {
    logout();
    return;
  }

  if (!res.ok) {
    const err = await res.text().catch(() => "");
    throw new Error(err || `Erro ${res.status}`);
  }

  if (res.status === 204) return null;
  return res.json();
}

// ── LIVROS ────────────────────────────────────────
export const listarLivros    = ()      => request("/livros");
export const buscarLivro     = (id)    => request(`/livros/${id}`);
export const cadastrarLivro  = (dados) => request("/livros",    { method: "POST",   body: JSON.stringify(dados) });
export const deletarLivro    = (id)    => request(`/livros/${id}`, { method: "DELETE" });

// ── USUARIOS ──────────────────────────────────────
export const listarUsuarios   = ()      => request("/usuarios");
export const buscarUsuario    = (id)    => request(`/usuarios/${id}`);
export const cadastrarUsuario = (dados) => request("/usuarios", { method: "POST",   body: JSON.stringify(dados) });
export const deletarUsuario   = (id)    => request(`/usuarios/${id}`, { method: "DELETE" });

// ── EMPRESTIMOS ───────────────────────────────────
export const listarEmprestimos  = ()      => request("/emprestimos");
export const criarEmprestimo    = (dados) => request("/emprestimos",              { method: "POST", body: JSON.stringify(dados) });
export const devolverLivro      = (id)    => request(`/emprestimos/${id}/devolucao`, { method: "PUT"  });
export const deletarEmprestimo  = (id)    => request(`/emprestimos/${id}`,           { method: "DELETE" });