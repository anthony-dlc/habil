import "../../assets/reset.css";
import "./SignIn.css";
import { useState } from "react";
import { supabase } from "../../supabase/supabaseClient";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Completa ambos campos");
      return;
    }

    const [data, error] = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setErrorMsg("Email o Contraseña  inválida");
      return;
    }

    alert("Sesión Iniciada");
    console.log(data);
  };

  return (
    <div className="signIn-formContainer">
      <img
        className="signIn-iconDark"
        src="icons/habil-logo-dark.svg"
        alt="habil logo con letras negras"
      />
      <form className="signIn-form" onSubmit={handleSubmit}>
        <h1 className="signIn-h1">Inicia Sesión</h1>
        <label htmlFor="email" className="signIn-label">
          Email
          <input
            className="signIn-input"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail"
            required
          />
        </label>
        <label htmlFor="password" className="signIn-label">
          Contraseña
          <input
            className="signIn-input"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
        </label>
        {errorMsg && <p className="signIn-ErrorMsg">{errorMsg}</p>}

        <button type="submit" className="signIn-btnSummit">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}

export default SignIn;
