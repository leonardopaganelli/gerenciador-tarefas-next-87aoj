import React from "react"

export const Login = () => {
    return (
        <div className="container-login">
            <img src="/icons/Logo.svg" alt="logo fiap" className="logo"/>
            <form>
                <div className="input">
                    <img src="/icons/mail.svg" alt="informe seu login"/>
                    <input type="text" placeholder="Login" />
                </div>
                <div className="input">
                    <img src="/icons/lock.svg" alt="informe sua senha"/>
                    <input type="password" placeholder="Senha"/>
                </div>
                <button>Login</button>
            </form>
        </div>
    )
}
