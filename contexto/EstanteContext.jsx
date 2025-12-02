import { createContext, useState, useEffect } from "react";

export const EstanteContext = createContext();

export function EstanteProvider({ children }) {

  const [estante, setEstante] = useState(() => {
    const data = localStorage.getItem("estante"); // Verifica se existe algo no localStorage chamado "estante"
    return data
      ? JSON.parse(data)  // Se existir converte de JSON para objeto
      : { // Se não existir,  cria uma estrutura vazia com três categorias
          jaLido: [],
          aLer: [],
          queroLer: []
        };
  });

    //Sempre que a estante muda, guarda no localStorage.
  useEffect(() => {
    localStorage.setItem("estante", JSON.stringify(estante));
  }, [estante]);

  
  
  function adicionarLivro(livro, categoria) {
    const novaCategoria = [...estante[categoria], livro]; // Copia todos os livros existentes na categoria e adiciona o novo 
    
    setEstante({
      ...estante,
      [categoria]: novaCategoria //Atualiza o estado estante com a nova categoria, mantendo as outras iguais
      
    });
  }


  function removerLivro(livroId, categoria) {
    const novaCategoria = estante[categoria].filter( //Filtra a lista da categoria para remover o livro com aquele id
      (livro) => livro.id !== livroId 
    );

    setEstante({ //Atualiza o estado estante com a lista filtrada
      ...estante,
      [categoria]: novaCategoria
    });
  }

  return (
    <EstanteContext.Provider value={{ estante, adicionarLivro, removerLivro }}> {/*disponibiliza o estado e funções para todos os filhos. */} 
      {children} {/* Tudo que está dentro do <EstanteProvider> no App.jsx. */}
    </EstanteContext.Provider>
  );
}
