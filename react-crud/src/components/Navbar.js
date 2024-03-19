import { Link } from "react-router-dom"


function Navbar() {
    return (
<nav className="navbar navbar-expand-lg bg-body-tertiary shadow">
  <div className="container">
    <Link className="navbar-brand" to="/">Menu</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about-us">A propos de Nous</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/contact-us">Contactez Nous</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/filieres">Filieres</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/parcours">Parcours</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/graderecherches">Grades de Recherche</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/gradepedagogiques">Grades Pedagogiques</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    );
}

export default Navbar ; 