import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

export function Navbar() {
  const { user, logout } = useAuth();
  const { totalCount, openCart } = useCart();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isAdmin = user?.rol === "ADMIN";

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light bg-light p-3 ${
        isScrolled ? "navbar-scrolled" : ""
      }`}
    >
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/home">
          <img
            src="/images/Logo_Chopper.png"
            alt="Logo_Chopper"
            className="img-fluid"
            width="100"
          />
        </NavLink>

        <div className="collapse navbar-collapse" id="barraNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/home">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/blog">
                Blog
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/aboutus">
                Sobre Nosotros
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Mi Vet
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link btn btn-primary text-white"
                style={{ backgroundColor: "#955EB7", color: "white" }}
                to="/catalog"
              >
                Productos
              </NavLink>
            </li>
            {isAdmin && (
              <li className="nav-item admin">
                <NavLink
                  className="nav-link btn btn-primary text-white"
                  style={{ backgroundColor: "#0EB1D2", color: "white" }}
                  to="/admin"
                >
                  Administrador
                </NavLink>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center">
            <div className="shopping">
              <i
                id="open-cart"
                className="fas fa-shopping-cart"
                onClick={openCart}
              ></i>
              <span className="quantity">{totalCount}</span>
            </div>

            {!user ? (
              <NavLink className="nav-link ms-2" id="logged" to="/login">
                Iniciar sesión
              </NavLink>
            ) : (
              <ul className="navbar-nav ml-auto">
                <li
                  className={`nav-item dropdown${dropdownOpen ? " show" : ""}`}
                >
                  <button
                    className="nav-link dropdown-toggle btn"
                    id="user-menu"
                    type="button"
                    aria-expanded={dropdownOpen}
                    onClick={() => setDropdownOpen((prev) => !prev)}
                  >
                    <span id="user-greeting">
                      Hola, {user.nombre.split(" ")[0]}.
                    </span>
                  </button>
                  {dropdownOpen && (
                    <div className="dropdown-menu dropdown-menu-right show">
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          logout();
                          setDropdownOpen(false);
                          navigate("/home");
                        }}
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
