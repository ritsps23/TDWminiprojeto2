import { useState } from "react";

function Card({ id, title, text, img, onClick }) {
  // Recebe props do livro e uma função onClick para abrir o modal
  const styleBackgroundNormal = { backgroundColor: "white" }; // Cor normal
  const styleBackgroundOver = { backgroundColor: " rgb(237, 191, 255)" };  // Cor quando hover
  const [bgStyle, setBgStyle] = useState(styleBackgroundNormal);
  // Estado local para alterar o background do card no hover

  return (
    <div className="col-md-3 mb-3">
      <div
        className="card"
        style={bgStyle}
        onMouseEnter={() => setBgStyle(styleBackgroundOver)} // Ao passar o rato muda cor
        onMouseLeave={() => setBgStyle(styleBackgroundNormal)}// Ao sair o rato a volta cor normal
      >
        <img
          src={img} // Usa a prop diretamente
          className="card-img-top"
          alt={title}
          onClick={onClick} // Ao clicar na imagem abre o modal (função passada pelo Cards.jsx)
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{text}</p>
        </div>
      </div>
    </div>
  );
}


export default Card;
