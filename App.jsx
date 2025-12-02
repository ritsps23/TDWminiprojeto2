import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EstanteProvider } from "./contexto/EstanteContext";
import HomePage from "./pages/Homepage";
import Estante from "./pages/Estante";
import Header from "./components/Header";

export default function App() {
  return (
    // Envolve toda a app no provider para que a estante esteja acessível em qualquer página
    <EstanteProvider>
      <BrowserRouter>
        <Header />
        {/* Define as rotas do site */}
        <Routes> 
          <Route path="/" element={<HomePage />} />
          <Route path="/estante" element={<Estante />} />
        </Routes>
      </BrowserRouter>
    </EstanteProvider>
  );
}
