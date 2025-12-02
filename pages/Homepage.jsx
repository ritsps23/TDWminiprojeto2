import { useEffect, useState } from "react";
import Cards from "../components/Cards";

export default function HomePage() {
  const [categoria, setCategoria] = useState("fantasy");  // Categoria selecionada pelo utilizador (default: fantasy)
  const [livros, setLivros] = useState([]); // Lista de livros carregados pela API
  const [isLoading, setIsLoading] = useState(true);  // Estado para indicar se ainda está a carregar
  const [startIndex, setStartIndex] = useState(0);   // Índice de onde começa a carregar mais livros (para "See More")
  const maxResults = 8;  // Número máximo de livros por carregamento

  function carregarLivros(categoria, append = false) {  // Função que vai buscar livros à API do Google Books
    const url = `https://www.googleapis.com/books/v1/volumes?q=${categoria}&startIndex=${startIndex}&maxResults=${maxResults}`;  // URL da API com categoria, startIndex e maxResults

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const novosLivros = (data.items || []).map((item, index) => { // Transforma cada item num novo objeto. O resultado é guardado em novosLivros.
        const volume = item.volumeInfo;
          return {
            id: `${startIndex}-${index}`, // cria um ID único
            title: volume.title || "Unknown title",
            text: volume.authors ? volume.authors.join(", ") : "Unknown author",
            img: volume.imageLinks?.thumbnail || "https://via.placeholder.com/128x180?text=Sem+Imagem",
            descricao: volume.description || "No description available"
          };
        });

        //Atualiza o estado dependendo se queres acrescentar livros ou substituir a lista.
        setLivros(prev =>
          append ? [...prev, ...novosLivros] : novosLivros
        );
        // Já carregou
        setIsLoading(false);
      })
      .catch(err => console.error("Error trying to load books:", err));
  }

  // Quando a categoria muda e reinicia o loading e carrega livros de novo
  useEffect(() => {
    setStartIndex(0); // Faz reset do índice
    setIsLoading(true); // Mostra "Loading"
    carregarLivros(categoria, false); // Carrega nova categoria
  }, [categoria]); // Sempre que a variável categoria mudar este useEffect é executado.

  // Função chamada ao clicar em "Ver mais"
  function loadMore() {
    const novoIndex = startIndex + maxResults; // Mais 8 livros
    setStartIndex(novoIndex); // Atualiza o estado
    carregarLivros(categoria, true); // append = true, junta ao array
  }

  return (
    <div className="container mt-4">

  <div className="d-flex flex-wrap gap-2 mb-4 category-bar">
  <button 
    className={`category-btn ${categoria === "fantasy" ? "active" : ""}`} //Se a categoria atual (categoria) for "fantasy", adiciona a classe "active".
    onClick={() => setCategoria("fantasy")}
  >
    Fantasy
  </button>
  
  <button  // Mesma coisa para o resto das categorias
    className={`category-btn ${categoria === "romance" ? "active" : ""}`}
    onClick={() => setCategoria("romance")}
  >
    Romance
  </button>

  <button 
    className={`category-btn ${categoria === "history" ? "active" : ""}`}
    onClick={() => setCategoria("history")}
  >
    History
  </button>

  <button 
    className={`category-btn ${categoria === "science" ? "active" : ""}`}
    onClick={() => setCategoria("science")}
  >
    Science
  </button>

  <button 
    className={`category-btn ${categoria === "mystery" ? "active" : ""}`}
    onClick={() => setCategoria("mystery")}
  >
    Mystery
  </button>

  <button 
    className={`category-btn ${categoria === "adventure" ? "active" : ""}`}
    onClick={() => setCategoria("adventure")}
  >
    Action
  </button>
</div>
       {/* Se ainda carrega mostra mensagem */}
      {isLoading ? <h4>Loading books...</h4> : <Cards items={livros} />}
      
      {/* Botão de ver mais */}
      <div className="text-center mt-3">
        <button className="category-btn" onClick={loadMore}>
          See More
        </button>
      </div>
    </div>
  );
}
