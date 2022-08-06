/* eslint-disable @next/next/no-img-element */
import React, { useContext} from "react";
import { AuthContext, AuthContextInterface } from "../providers/auth.provider";

interface FooterInterface {
    addTaskCallback: () => void;
}
export const Footer = ({ addTaskCallback }: FooterInterface) => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="footer">
            <button
                className="button add-task"
                onClick={() => addTaskCallback()}
            >
                Adicionar uma tarefa
            </button>
            <span>
                {`© Copyright ${currentYear}. Todos os direitos reservados.`}
            </span>
        </footer>
    )
}