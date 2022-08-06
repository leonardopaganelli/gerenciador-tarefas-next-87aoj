/* eslint-disable @next/next/no-img-element */
import React, { useContext} from "react";
import { AuthContext, AuthContextInterface } from "../providers/auth.provider";

export const Header = ({ addTaskCallback }: {addTaskCallback: () => void}) => {
    const {
        userAuth: { name },
        setUserAuth
      }: AuthContextInterface = useContext(AuthContext);
    const [firstName] = name.split(" ");

    const logOut = () => {
        localStorage.removeItem("token");
        setUserAuth({
          isLoggedIn: false,
          name: "",
          token: ""
        })
      }
    return (
        <header className="header">
            <img src="/icons/Logo.svg" alt="logo fiap" className="logo" />
            <button
                className="button add-task"
                onClick={() => addTaskCallback()}
            >
              Adicionar uma tarefa
            </button>
            <button className="logout" onClick={logOut}>
                <span>{`Olá, ${firstName}`}</span>
                <img
                    src="/icons/ExitMobile.svg"
                    alt="logo fiap"
                    className="exit-logo"
                />
            </button>
        </header>
    )
}