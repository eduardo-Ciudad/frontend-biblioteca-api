import { listarEmprestimos, criarEmprestimo, devolverLivro, deletarEmprestimo, listarLivros, listarUsuarios } from "./api.js";
import { toast, setActiveNav, fmtDate } from "./utils.js";

setActiveNav();

const tbody = document.getElementById("emprestimos-tbody");
const form = document.getElementById("form-emprestimo");
const selectLivro = document.getElementById("livroId");
const selectUsuario = document.getElementById("usuarioId");
const countEl = document.getElementById("count-emprestimos");
const countAtivos = document.getElementById("count-ativos");

async function carregarSelects() {
  const [livros, usuarios] = await Promise.all([listarLivros(), listarUsuarios()]);
  const disponíveis = livros.filter(l => l.disponivel);
  selectLivro.innerHTML = `<option value="">Selecionar livro…</option>` +
    disponíveis.map(l => `<option value="${l.id}">${l.titulo}</option>`).join("");
  selectUsuario.innerHTML = `<option value="">Selecionar usuário…</option>` +
    usuarios.map(u => `<option value="${u.id}">${u.nome}</option>`).join("");
}

async function carregar() {
  tbody.innerHTML = `<tr><td colspan="5"><div class="skeleton" style="width:70%"></div></td></tr>`;
  try {
    const emprestimos = await listarEmprestimos();
    countEl.textContent = emprestimos.length;
    countAtivos.textContent = emprestimos.filter(e => e.ativo).length;
    renderTabela(emprestimos);
  } catch {
    tbody.innerHTML = `<tr><td colspan="5"><div class="empty-state"><div class="empty-icon">⚠</div><p>Erro ao carregar empréstimos</p></div></td></tr>`;
  }
}

function renderTabela(emprestimos) {
  if (!emprestimos.length) {
    tbody.innerHTML = `<tr><td colspan="5"><div class="empty-state"><div class="empty-icon">🔄</div><p>Nenhum empréstimo registrado</p></div></td></tr>`;
    return;
  }
  tbody.innerHTML = emprestimos.map(e => `
    <tr>
      <td><strong>${e.tituloLivro ?? "—"}</strong></td>
      <td>${e.nomeUsuario ?? "—"}</td>
      <td>${fmtDate(e.dataEmprestimo)}</td>
      <td>
        <span class="badge ${e.ativo ? "badge-active" : "badge-available"}">
          <span class="badge-dot"></span>
          ${e.ativo ? "Em andamento" : "Devolvido"}
        </span>
      </td>
      <td style="display:flex;gap:8px">
        ${e.ativo ? `<button class="btn btn-ghost btn-sm btn-devolver" data-id="${e.id}">Devolver</button>` : ""}
        <button class="btn btn-danger btn-sm btn-delete" data-id="${e.id}">Remover</button>
      </td>
    </tr>
  `).join("");

  document.querySelectorAll(".btn-devolver").forEach(btn => {
    btn.addEventListener("click", async () => {
      try {
        await devolverLivro(btn.dataset.id);
        toast("Devolução registrada");
        carregar();
        carregarSelects();
      } catch (e) {
        toast(e.message, "error");
      }
    });
  });

  document.querySelectorAll(".btn-delete").forEach(btn => {
    btn.addEventListener("click", async () => {
      if (!confirm("Remover este empréstimo?")) return;
      try {
        await deletarEmprestimo(btn.dataset.id);
        toast("Empréstimo removido");
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
  btn.textContent = "Registrando…";
  try {
    await criarEmprestimo({
      usuarioId: Number(selectUsuario.value),
      livroId: Number(selectLivro.value),
    });
    toast("Empréstimo registrado");
    form.reset();
    carregar();
    carregarSelects();
  } catch (e) {
    toast(e.message, "error");
  } finally {
    btn.disabled = false;
    btn.textContent = "Registrar Empréstimo";
  }
});

carregarSelects();
carregar();