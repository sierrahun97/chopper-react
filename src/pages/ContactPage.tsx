import type { FormEvent } from "react";

function validateName(name: string) {
  return /^[A-Za-z\s]+$/.test(name);
}

function validateEmail(email: string) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

function handleValidation(form: HTMLFormElement) {
  const name = (form.querySelector('[name="name"]') as HTMLInputElement).value;
  const email = (form.querySelector('[name="email"]') as HTMLInputElement)
    .value;
  const message = (
    form.querySelector('[name="message"]') as HTMLTextAreaElement
  ).value;

  if (!name || !email || !message) {
    alert("Todos los campos son obligatorios.");
    return false;
  }
  if (!validateName(name)) {
    alert("El nombre no puede contener números y solo debe incluir letras.");
    return false;
  }
  if (!validateEmail(email)) {
    alert("Por favor, ingresa un email válido que contenga @.");
    return false;
  }
  return true;
}

export function ContactPage() {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (!handleValidation(form)) {
      event.preventDefault();
    }
  };

  return (
    <main>
      <section className="slogan-text home-hero">
        <h1>Tienda para mascotas Chopper</h1>
        <p>
          En Chopper, creemos que cada mordisco, ronroneo y salto de alegría
          merece el mejor cuidado y cariño.
        </p>
      </section>

      <section className="contact">
        <img src="/img/vet-form.png" alt="about-us" />
        <div className="form-title">
          <h2>Contacta a un veterinario aliado</h2>
          <form
            onSubmit={onSubmit}
            action="https://formspree.io/f/xovaoldb"
            method="POST"
          >
            <div className="inputs-row">
              <div className="form-group">
                <label htmlFor="vet-name">Nombre</label>
                <input
                  type="text"
                  id="vet-name"
                  name="name"
                  placeholder="Nombre aquí"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="vet-email">Email</label>
                <input
                  type="email"
                  id="vet-email"
                  name="email"
                  placeholder="Email aquí"
                  required
                />
              </div>
            </div>
            <label htmlFor="vet-message">Detalles</label>
            <textarea
              id="vet-message"
              name="message"
              rows={5}
              placeholder="Escriba su mensaje aquí"
              required
            ></textarea>
            <button className="btn-form" type="submit">
              Enviar
            </button>
          </form>
        </div>
      </section>

      <section id="form2" className="contact">
        <div className="form-title">
          <h2>Contáctanos</h2>
          <form
            onSubmit={onSubmit}
            action="https://formspree.io/f/xovaoldb"
            method="POST"
          >
            <div className="inputs-row">
              <div className="form-group">
                <label htmlFor="contact-name">Nombre</label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  placeholder="Nombre aquí"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-lastname">Apellido</label>
                <input
                  type="text"
                  id="contact-lastname"
                  name="lastname"
                  placeholder="Apellido aquí"
                  required
                />
              </div>
            </div>
            <div className="inputs-row">
              <div className="form-group">
                <label htmlFor="contact-email">Email</label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  placeholder="Email aquí"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-phone">Teléfono</label>
                <input
                  type="tel"
                  id="contact-phone"
                  name="phone"
                  placeholder="Teléfono aquí"
                  required
                />
              </div>
            </div>
            <label htmlFor="contact-message">Detalles</label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              placeholder="Escriba su mensaje aquí"
              required
            ></textarea>
            <button className="btn-form" type="submit">
              Enviar
            </button>
          </form>
        </div>
        <img src="/img/contact-form.png" alt="about-us" />
      </section>
    </main>
  );
}
