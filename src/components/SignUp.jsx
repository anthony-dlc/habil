import "../styles/reset.css";
import "../styles/SignUp.css";
import { useState } from "react";
import { supabase } from "../supabase/supabaseClient";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validarEmail = (email) => {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regexEmail.test(email);
  };

  const validarPassword = (password) => {
    const tieneOchoCaractere = password.length >= 8;
    const tieneMayusculas = /[A-Z]/.test(password);
    const tieneMinusculas = /[a-z]/.test(password);
    const tieneNumeros = /[0-9]/.test(password);

    return (
      tieneOchoCaractere && tieneMayusculas && tieneMinusculas && tieneNumeros
    );
  };

  const validarConfirmPassword = (confirmPassword) => {
    return confirmPassword === password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validarEmail(email)) {
      setErrorMessage("Correo no valido");
      return;
    }

    if (!validarPassword(password)) {
      setErrorMessage(
        "La contraseña debe tener mínimo 8 caracteres, mayúscula, minúscula y número",
      );
      return;
    }

    if (!validarConfirmPassword(confirmPassword)) {
      setErrorMessage("La contraseña no coinciden, intentalo de nuevo");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name,
        },
      },
    });

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    alert("User created");
  };

  return (
    <div className="form-container">
      <img
        className="icon-dark"
        src="icons/habil-logo-dark.svg"
        alt="habil-logo"
      />
      <img
        className="icon-light"
        src="icons/habil-logo-light.svg"
        alt="habil-logo"
      />
      <form onSubmit={handleSubmit}>
        <h1>Administra tus clientes y lleva el control</h1>
        <p className="subtitulo">Crea tu cuenta</p>
        <div className="label-container">
          <label htmlFor="name">
            Nombre
            <input
              type="text"
              name="name"
              placeholder="Jon Doe"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label htmlFor="email">
            Correo Electrónico
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label htmlFor="password">
            Contraseña
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Contraseña"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="referencia">
              mínimo 8 caracteres, mayúscula, minúscula y número
            </span>
          </label>
          <label htmlFor="confirmPassword">
            Confirmar Contraseña
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirmar Contraseña"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Crear Cuenta</button>
      </form>
    </div>
  );
}

export default SignUp;
