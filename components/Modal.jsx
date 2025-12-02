import { useContext } from "react";
import { EstanteContext } from "../contexto/EstanteContext";

export default function Modal({ livro, onClose }) {
  const { adicionarLivro } = useContext(EstanteContext);
  // Hook para usar a função de adicionar livro na estante

  if (!livro) return null;
  // Se nenhum livro foi selecionado não renderiza o modal

  function handleEstado(estado) {
    adicionarLivro(livro, estado); // Adiciona o livro selecionado à categoria correspondente na estante
    onClose(); // Fecha o modal depois do utilizador escolher a categoria
  }

  return (
    <div className="modal-overlay" onClick={onClose}>  {/* overlay escuro atrás do modal. Ao clicar fecha o modal */}
  <div className="modal-box" onClick={(e) => e.stopPropagation()}>  {/* caixa do modal. Stop propagation para não fechar ao clicar dentro */}
    <button className="modal-close" onClick={onClose}>×</button>
    <h2>{livro.title}</h2>
    <p><strong>Autor:</strong> {livro.text}</p>
    <img src={livro.img} alt={livro.title} style={{ width: "150px" }} />
    <p className="descricao">{livro.descricao}</p>


    <div className="modal-buttons">
      <button className="btn-read" onClick={() => handleEstado("jaLido")}>Read</button>
      <button className="btn-reading" onClick={() => handleEstado("aLer")}>Reading</button>
      <button className="btn-want" onClick={() => handleEstado("queroLer")}>Want to read</button>
    </div>
  </div>
</div>

  );
}
