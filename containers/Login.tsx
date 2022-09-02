/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { MouseEvent, useContext, useState } from "react";
import { executeRequest } from "../services/apiService";
import { AuthContext, AuthContextInterface } from "../providers/auth.provider";

export const Login = () => {
  const { setUserAuth }: AuthContextInterface = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = (event: MouseEvent) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const submitLogin = async (event: unknown) => {
    try {
      event.preventDefault();
      const formValues = {
        login: event.target.email.value,
        password: event.target.password.value,
      };

      const result = await executeRequest({
        endpoint: "login",
        method: "POST",
        body: {
          ...formValues,
        },
      });

      const { token, name } = result.data;
      setUserAuth({
        isLoggedIn: true,
        token,
        name,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-login">
      <img src="/icons/Logo.svg" alt="logo fiap" className="logo" />
      <form onSubmit={submitLogin}>
        <div className="input">
          <img src="/icons/mail.svg" alt="informe seu login" />
          <input type="text" name="email" placeholder="Login" />
        </div>
        <div className="input">
          <img src="/icons/lock.svg" alt="informe sua senha" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Senha"
          />
          <button onClick={togglePassword} className="olho">
            <img src="/icons/eye.svg" />
          </button>
        </div>
        <button className="login-button">Login</button>
      </form>
    </div>
  );
};
