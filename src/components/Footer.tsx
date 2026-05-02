export function Footer() {
  return (
    <footer id="footer">
      <div className="container-fluid py-4">
        <div className="d-flex flex-column flex-md-row gap-4 gap-md-2 align-items-end">
          <div className="container-fluid">
            <img src="/images/Logo_Chopper.png" alt="logo" />
            <div>
              <p>
                <strong>Unete a nuestra comunidad</strong>
                <br />
                Recibe informacion actualizada de los productos y descuentos que
                ofrecemos.
              </p>
            </div>
          </div>
          <div className="container-fluid">
            <table style={{ width: "100%" }}>
              <tbody>
                <tr className="d-flex flex-column gap-2">
                  <th style={{ textAlign: "left", paddingRight: "20px" }}></th>
                  <th style={{ textAlign: "left" }}>Contactenos</th>
                </tr>
                <tr className="d-flex flex-column gap-2">
                  <td style={{ textAlign: "left", paddingRight: "20px" }}></td>
                  <td style={{ textAlign: "left" }}>NIT: 900123456-7</td>
                </tr>
                <tr className="d-flex flex-column gap-2">
                  <td style={{ textAlign: "left", paddingRight: "20px" }}></td>
                  <td style={{ textAlign: "left" }}>
                    Calle 123 #45-67, Local 8, Bogota, Colombia
                  </td>
                </tr>
                <tr className="d-flex flex-column gap-2">
                  <td style={{ textAlign: "left", paddingRight: "20px" }}></td>
                  <td style={{ textAlign: "left" }}>+(57) 320 123 4567</td>
                </tr>
                <tr className="d-flex flex-column gap-2">
                  <td style={{ textAlign: "left", paddingRight: "20px" }}>
                    <a href="#">Preguntas frecuentes</a>
                  </td>
                  <td style={{ textAlign: "left" }}>
                    <a href="#">contacto@chopperpets.com</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="container-fluid d-flex justify-content-start justify-content-lg-end">
            <div className="icon-container p-2 d-flex">
              <a href="https://wa.me/" target="_blank" rel="noreferrer">
                <i
                  className="fab fa-whatsapp me-3"
                  style={{ fontSize: "32px", color: "#25D366" }}
                ></i>
              </a>
              <a href="https://instagram.com/" target="_blank" rel="noreferrer">
                <i
                  className="fab fa-instagram me-3"
                  style={{ fontSize: "32px", color: "#E1306C" }}
                ></i>
              </a>
              <a href="https://facebook.com/" target="_blank" rel="noreferrer">
                <i
                  className="fab fa-facebook-f"
                  style={{ fontSize: "32px", color: "#3b5998" }}
                ></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
