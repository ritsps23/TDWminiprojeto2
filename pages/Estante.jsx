import { useContext, useState} from "react"; // Importa hooks do React: useContext (para contexto global) e useState (para estado local)
import { EstanteContext } from "../contexto/EstanteContext";
import Modal from "../components/Modal";

export default function Estante() {
  const { estante, removerLivro } = useContext(EstanteContext); // useContext pega o valor atual do contexto EstanteContext. Destrutura-se para pegar em 'estante' e 'removerLivro'
  const [livroSelecionado, setLivroSelecionado] = useState(null); // Importa o modal que aparece ao clicar num livro

  // Função que cria a secção de livros para uma categoria
  function renderCategoria(nomeCategoria, livros) {
    return (
      <>
      <div className="categoria-box">
        <h2 className="categoria-box-title">{nomeCategoria}</h2>
        <div className="row mb-4">
          {livros.map((livro, i) => (
                <div key={i} className="col-md-3 mb-3">
                  <div
                    className="livro-card"
                    onClick={() => setLivroSelecionado(livro)} // Ao clicar no card, define o livroSelecionado e abre o modal
                    style={{ cursor: "pointer" }}
                  >
                    <img src={livro.img} alt={livro.title} className="livro-img" />
                    <h5 className="livro-title">{livro.title}</h5>
                    <p className="livro-author">{livro.text}</p>
                    <button
                    className="btn btn-danger btn-sm"
                    
                    onClick={(e) => {
                    e.stopPropagation(); // Evita que o clique no botão abra o modal
                    removerLivro(
                      livro.id,
                      nomeCategoria === "READ" ? "jaLido" :
                      nomeCategoria === "READING" ? "aLer" : 
                      "queroLer"
                    ); // Remove o livro da categoria correta
                  }}
                >
                  Remove
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      </>
    );
  }
      
  return (
    <div className="container mt-4">
      {/* Renderiza todas as categorias com os livros correspondentes */}
      {renderCategoria("READ", estante.jaLido)}
      {renderCategoria("READING", estante.aLer)}
      {renderCategoria("WANT TO READ", estante.queroLer)}

     
      <Modal
        livro={livroSelecionado}
        onClose={() => setLivroSelecionado(null)}  //Função para fechar modal
      />
    </div>
  );

  
}


