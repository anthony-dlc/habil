import "../styles/reset.css";
import "../styles/CreateAccount.css";
import { useState } from "react";
import { supabase } from "../supabase/supabaseClient";

function CreateAccount() {
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
    console.log(data);
  };

  return (
    <div className="form-container">
      <img
        className="icon-dark"
        src="../public/icons/habil-logo-dark.svg"
        alt="habil-logo"
      />
      <img
        className="icon-light"
        src="../public/icons/habil-logo-light.svg"
        alt="habil-logo"
      />
      <img
        className="form-background"
        src="../public/images/large-form-img.jpg"
        alt="computadora con herramientas"
      />
      <form onSubmit={handleSubmit}>
        <h2>Administra tus clientes y lleva el control</h2>
        <label htmlFor="name">
          Nombre
          <input
            type="text"
            name="name"
            placeholder="Jon Doe"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label htmlFor="email">
          Correo Electronico
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label htmlFor="password">
          Contraseña
          <input
            type="password"
            name="password"
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
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Crear Cuenta</button>
      </form>
    </div>
  );
}

export default CreateAccount;
