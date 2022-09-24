/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { MouseEvent, useContext, useState } from "react";
import { executeRequest } from "../services/apiService";
import { AuthContext, AuthContextInterface } from "../providers/auth.provider";
import { verifyNullOrEmpty } from "../util/verifyNullOrEmpty";

export const Login = () => {
  const { setUserAuth }: AuthContextInterface = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const togglePassword = (event: MouseEvent) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const resetForm = () => {
    setLogin("");
    setPassword("");
    setError("");
  };
  const submitLogin = async (event: MouseEvent) => {
    try {
      event.preventDefault();
      if ([login, password].some((input) => verifyNullOrEmpty(input))) {
        return setError("Favor informar usuário e senha.");
      }

      const result = await executeRequest({
        endpoint: "login",
        method: "POST",
        body: {
          login,
          password,
        },
      });
      if (!result || !result.data) {
        return setError("Ocorreu erro ao processar login, tente novamente!");
      }

      const { token, name } = result.data;
      setUserAuth({
        isLoggedIn: true,
        token,
        name,
      });
      resetForm();
    } catch (error: any) {
      if (error?.response?.data?.error) {
        return setError(error?.response?.data?.error);
      }
      setError("Ocoreu erro ao processar login, tente novamente!");
    }
  };

  return (
    <div className="container-login">
      <img src="/icons/Logo.svg" alt="logo fiap" className="logo" />
      <form>
        <p className="error">{error}</p>
        <div className="input">
          <img src="/icons/mail.svg" alt="informe seu login" />
          <input
            type="text"
            name="email"
            placeholder="Login"
            value={login}
            onChange={(event) => setLogin(event.target.value)}
          />
        </div>
        <div className="input">
          <img src="/icons/lock.svg" alt="informe sua senha" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Senha"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button onClick={togglePassword} className="olho">
            <img src="/icons/eye.svg" />
          </button>
        </div>
        <button className="login-button" onClick={submitLogin}>
          Login
        </button>
      </form>
    </div>
  );
};
