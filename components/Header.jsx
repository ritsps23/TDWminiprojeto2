import { Link } from "react-router-dom";
import "../index.css";

export default function Header() {
  return (
    <header className="header">
       <Link to="/" className="logo">BooksForDays</Link>

      <nav className="nav">
        <Link to="/estante" className="link">My Books</Link>
      </nav>
    </header>
  );
}
