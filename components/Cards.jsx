import Card from "./Card";
import { useState } from "react";
import Modal from "./Modal";


function Cards({ items }) {
  const [livroSelecionado, setLivroSelecionado] = useState(null);
  // Estado para controlar qual livro está selecionado no modal

  return (
      <>
       <div className="container">
      <div className="row mt-3 g-4">
        {items.map((value, index) => (
          <Card key={index} {...value}  // Passa todas as props do livro (title, text, img, id)
          onClick={() => setLivroSelecionado(value)}/> // Ao clicar abre modal do livro selecionado
        ))}
      </div>
    </div>

      <Modal
        livro={livroSelecionado}
        onClose={() => setLivroSelecionado(null)} // Fecha o modal
      />
    </>
  );
}
export default Cards;

