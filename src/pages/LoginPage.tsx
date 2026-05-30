import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error">("error");

  const [registerData, setRegisterData] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { register, login } = useAuth();
  const navigate = useNavigate();

  const onRegister = (event: FormEvent) => {
    event.preventDefault();

    if (!registerData.nombre || !registerData.email || !registerData.password) {
      setType("error");
      setMessage("Por favor, completa todos los campos.");
      return;
    }

    const result = register({
      nombre: registerData.nombre,
      email: registerData.email,
      password: registerData.password,
    });

    setType(result.ok ? "success" : "error");
    setMessage(result.message);

    if (result.ok) {
      setRegisterData({
        nombre: "",
        email: "",
        password: "",
      });
      setIsSignup(false);
    }
  };

  const onLogin = (event: FormEvent) => {
    event.preventDefault();

    if (!loginData.email || !loginData.password) {
      setType("error");
      setMessage("Por favor, ingresa tu correo y contraseña.");
      return;
    }

    const result = login(loginData.email, loginData.password);
    setType(result.ok ? "success" : "error");
    setMessage(result.message);

    if (result.ok) {
      navigate("/home");
    }
  };

  return (
    <>
      <div className={`login-container ${isSignup ? "sign-up-mode" : ""}`}>
        <div className="forms-container">
          <div className="signin-signup">
            <form action="#" className="sign-in-form" onSubmit={onLogin}>
              <h2 className="title">Inicia sesión</h2>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  id="login-email"
                  type="email"
                  placeholder="Correo"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  id="login-password"
                  type="password"
                  placeholder="Contraseña"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
              </div>
              <input
                id="btn-login"
                type="submit"
                value="Iniciar sesión"
                className="btn solid"
              />
              {!isSignup && message && (
                <p
                  style={{
                    color: type === "error" ? "#bb281e" : "#0EB1D2",
                    fontWeight: 600,
                    textAlign: "center",
                    marginTop: "10px",
                    fontSize: "0.92rem",
                  }}
                >
                  {message}
                </p>
              )}
              <p className="social-text">
                Volver al{" "}
                <strong
                  onClick={() => navigate("/home")}
                  style={{ cursor: "pointer" }}
                >
                  inicio
                </strong>
              </p>
            </form>

            <form action="#" className="sign-up-form" onSubmit={onRegister}>
              <h2 className="title">Regístrate</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Nombre"
                  value={registerData.nombre}
                  onChange={(e) =>
                    setRegisterData((prev) => ({
                      ...prev,
                      nombre: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  placeholder="Correo"
                  value={registerData.email}
                  onChange={(e) =>
                    setRegisterData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={registerData.password}
                  onChange={(e) =>
                    setRegisterData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
              </div>
              <input
                id="btn-register"
                type="submit"
                className="btn"
                value="Registrarme"
              />
              <p className="social-text">
                Volver al{" "}
                <strong
                  onClick={() => navigate("/home")}
                  style={{ cursor: "pointer" }}
                >
                  inicio
                </strong>
              </p>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>¿Quieres ser parte de Chopper?</h3>
              <p>Únete con nosotros</p>
              <button
                className="btn transparent"
                id="sign-up-btn"
                type="button"
                onClick={() => setIsSignup(true)}
              >
                Regístrate
              </button>
            </div>
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>¿Eres parte de nosotros?</h3>
              <p>Inicia sesión y disfruta de todos nuestros beneficios.</p>
              <button
                className="btn transparent"
                id="sign-in-btn"
                type="button"
                onClick={() => setIsSignup(false)}
              >
                Iniciar sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      {message && (
        <div id="custom-alert" className={`alert ${type}`}>
          {message}
        </div>
      )}
    </>
  );
}
