import "../../assets/reset.css";
import "./SignUp.css";
import { useState } from "react";
import { supabase } from "../../supabase/supabaseClient";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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
    setErrorMsg("");

    if (!validarEmail(email)) {
      setErrorMsg("Correo no valido");
      return;
    }

    if (!validarPassword(password)) {
      setErrorMsg(
        "La contraseña debe tener mínimo 8 caracteres, mayúscula, minúscula y número",
      );
      return;
    }

    if (!validarConfirmPassword(confirmPassword)) {
      setErrorMsg("La contraseña no coinciden, intentalo de nuevo");
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
      setErrorMsg(error.message);
      return;
    }

    alert("User created");
    console.log(data);
  };

  return (
    <div className="signUp-formContainer">
      <img
        className="signUp-iconDark"
        src="icons/habil-logo-dark.svg"
        alt="habil-logo"
      />
      <form className="signUp-form" onSubmit={handleSubmit}>
        <h1 className="signUp-h1">
          Administra tus clientes y lleva el control
        </h1>
        <p className="signUp-subtitulo">Crea tu cuenta</p>
        <div className="signUp-labelContainer">
          <label className="signUp-label" htmlFor="name">
            Nombre
            <input
              className="signUp-input"
              type="text"
              name="name"
              placeholder="Jon Doe"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="signUp-label" htmlFor="email">
            Correo Electrónico
            <input
              className="signUp-input"
              type="email"
              name="email"
              placeholder="example@gmail.com"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="signUp-label" htmlFor="password">
            Contraseña
            <input
              className="signUp-input"
              type="password"
              name="password"
              value={password}
              placeholder="Contraseña"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="signUp-referencia">
              mínimo 8 caracteres, mayúscula, minúscula y número
            </span>
          </label>
          <label className="signUp-label" htmlFor="confirmPassword">
            Confirmar Contraseña
            <input
              className="signUp-input"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirmar Contraseña"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
        </div>
        {errorMsg && <p className="signUp-ErrorMsg">{errorMsg}</p>}{" "}
        <p className="signUp-ErrorMsg">Hello</p>
        <button type="submit" className="signUp-btn">
          Crear Cuenta
        </button>
      </form>
    </div>
  );
}

export default SignUp;
