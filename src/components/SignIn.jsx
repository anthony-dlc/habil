import "../styles/SignIn.css";
import { useState } from "react";
import { supabase } from "../supabase/supabaseClient";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Completa ambos campos");
      return;
    }

    const [data, error] = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setErrorMessage("Email o Contraseña  inválida");
      return;
    }

    alert("Sesión Iniciada");
  };

  return (
    <div className="form-container">
      <img
        className="icon-dark"
        src="icons/habil-logo-dark.svg"
        alt="habil logo con letras negras"
      />
      <form onSubmit={handleSubmit}>
        <h1>Iniciar Sesión</h1>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail"
            required
          />
        </label>
        <label htmlFor="password">
          Contraseña
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
        </label>
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default SignIn;
