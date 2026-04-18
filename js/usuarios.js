import { listarUsuarios, cadastrarUsuario, deletarUsuario } from "./api.js";
import { toast, setActiveNav } from "./utils.js";

setActiveNav();

const tbody = document.getElementById("usuarios-tbody");
const form = document.getElementById("form-usuario");
const countEl = document.getElementById("count-usuarios");

async function carregar() {
  tbody.innerHTML = `<tr><td colspan="3"><div class="skeleton" style="width:50%"></div></td></tr>`;
  try {
    const usuarios = await listarUsuarios();
    countEl.textContent = usuarios.length;
    renderTabela(usuarios);
  } catch {
    tbody.innerHTML = `<tr><td colspan="3"><div class="empty-state"><div class="empty-icon">⚠</div><p>Erro ao carregar usuários</p></div></td></tr>`;
  }
}

function renderTabela(usuarios) {
  if (!usuarios.length) {
    tbody.innerHTML = `<tr><td colspan="3"><div class="empty-state"><div class="empty-icon">👤</div><p>Nenhum usuário cadastrado ainda</p></div></td></tr>`;
    return;
  }
  tbody.innerHTML = usuarios.map(u => `
    <tr>
      <td><strong>${u.nome}</strong></td>
      <td>${u.email}</td>
      <td>
        <button class="btn btn-ghost btn-sm btn-delete" data-id="${u.id}">Remover</button>
      </td>
    </tr>
  `).join("");

  document.querySelectorAll(".btn-delete").forEach(btn => {
    btn.addEventListener("click", async () => {
      if (!confirm("Remover este usuário?")) return;
      try {
        await deletarUsuario(btn.dataset.id);
        toast("Usuário removido");
        carregar();
      } catch (e) {
        toast(e.message, "error");
      }
    });
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = form.querySelector("button[type=submit]");
  btn.disabled = true;
  btn.textContent = "Salvando…";
  try {
    await cadastrarUsuario({
      nome: document.getElementById("nome").value.trim(),
      email: document.getElementById("email").value.trim(),
    });
    toast("Usuário cadastrado com sucesso");
    form.reset();
    carregar();
  } catch (e) {
    toast(e.message, "error");
  } finally {
    btn.disabled = false;
    btn.textContent = "Cadastrar";
  }
});

carregar();