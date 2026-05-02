import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Pagina no encontrada</h1>
      <p>La ruta que buscas no existe en Chopper React.</p>
      <Link to="/home">Volver al inicio</Link>
    </main>
  );
}
