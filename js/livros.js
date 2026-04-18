import { listarLivros, cadastrarLivro, deletarLivro } from "./api.js";
import { toast, setActiveNav } from "./utils.js";

setActiveNav();

const tbody = document.getElementById("livros-tbody");
const form = document.getElementById("form-livro");
const countEl = document.getElementById("count-livros");
const countDisp = document.getElementById("count-disponiveis");

async function carregar() {
  tbody.innerHTML = `<tr><td colspan="4"><div class="skeleton" style="width:60%"></div></td></tr>`;
  try {
    const livros = await listarLivros();
    countEl.textContent = livros.length;
    countDisp.textContent = livros.filter(l => l.disponivel).length;
    renderTabela(livros);
  } catch {
    tbody.innerHTML = `<tr><td colspan="4"><div class="empty-state"><div class="empty-icon">⚠</div><p>Erro ao carregar livros</p></div></td></tr>`;
  }
}

function renderTabela(livros) {
  if (!livros.length) {
    tbody.innerHTML = `<tr><td colspan="4"><div class="empty-state"><div class="empty-icon">📚</div><p>Nenhum livro cadastrado ainda</p></div></td></tr>`;
    return;
  }
  tbody.innerHTML = livros.map(l => `
    <tr>
      <td>
        <strong>${l.titulo}</strong>
      </td>
      <td>${l.autor}</td>
      <td>
        <span class="badge ${l.disponivel ? "badge-available" : "badge-borrowed"}">
          <span class="badge-dot"></span>
          ${l.disponivel ? "Disponível" : "Emprestado"}
        </span>
      </td>
      <td>
        <button class="btn btn-ghost btn-sm btn-delete" data-id="${l.id}">Remover</button>
      </td>
    </tr>
  `).join("");

  document.querySelectorAll(".btn-delete").forEach(btn => {
    btn.addEventListener("click", async () => {
      if (!confirm("Remover este livro?")) return;
      try {
        await deletarLivro(btn.dataset.id);
        toast("Livro removido");
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
    await cadastrarLivro({
      titulo: document.getElementById("titulo").value.trim(),
      autor: document.getElementById("autor").value.trim(),
      disponivel: true,
    });
    toast("Livro cadastrado com sucesso");
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