import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

const entryPoint = document.getElementById("root"); // Seleciona o  HTML onde a app vai ser montada
ReactDOM.createRoot(entryPoint).render(<App />); // Cria a root do React e renderiza o componente App dentro dela
