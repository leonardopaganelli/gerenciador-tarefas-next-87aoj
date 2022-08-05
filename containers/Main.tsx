import React, { useContext } from "react";
import { AuthContext, AuthContextInterface } from "../providers/auth.provider";

export const Main = () => {
  const {
    userAuth: { name },
  }: AuthContextInterface = useContext(AuthContext);
  const [firstName] = name.split(" ");
  // const tasks = [
  //   {
  //     id: "66fad0ec-4478-4bd5-a004-3bbf12094746",
  //     name: "Tarefa 3",
  //     date: "18/10/2021",
  //   },
  //   {
  //     id: "e78afc0c-6192-4c2e-877d-222e6e49a11b",
  //     name: "Tarefa 3",
  //     date: "18/10/2021",
  //   },
  //   {
  //     id: "1bb61790-a3a5-4ca6-9891-5911a35d0943",
  //     name: "Tarefa 3",
  //     date: "18/10/2021",
  //   },
  //   {
  //     id: "da9d4dc8-f2c1-40a8-88c9-e48922528d7c",
  //     name: "Tarefa 3",
  //     date: "18/10/2021",
  //   },
  //   {
  //     id: "a56eb076-1ce1-4e81-948f-c50aa71a9c41",
  //     name: "Tarefa 3",
  //     date: "18/10/2021",
  //   },
  //   {
  //     id: "6706c71e-84b0-47b5-9340-109a4acb5572",
  //     name: "Tarefa 3",
  //     date: "18/10/2021",
  //   },
  //   {
  //     id: "80a670ac-c6a6-4920-9d3a-11ef8ba21e86",
  //     name: "Tarefa 3",
  //     date: "18/10/2021",
  //   },
  //   {
  //     id: "443f1be7-8387-460d-b70c-f1c6cf9243bb",
  //     name: "Tarefa 3",
  //     date: "18/10/2021",
  //   },
  //   {
  //     id: "1d6e3a45-2891-4067-b86e-807f3d99d67f",
  //     name: "Tarefa 3",
  //     date: "18/10/2021",
  //   },
  //   {
  //     id: "e5554538-12a0-498f-b0f0-a5ebc6cf6ccf",
  //     name: "Tarefa 3",
  //     date: "18/10/2021",
  //   },
  //   {
  //     id: "ef2c8b70-5e4b-4d32-b17d-eb33f84650a3",
  //     name: "Tarefa 3",
  //     date: "18/10/2021",
  //   },
  //   {
  //     id: "8175f7af-5bde-4031-82d5-2e023d8b180f",
  //     name: "Tarefa 3",
  //     date: "18/10/2021",
  //   },
  //   {
  //     id: "dad1b886-79ba-46a7-96c0-720df55f6ced",
  //     name: "Tarefa 3",
  //     date: "18/10/2021",
  //   },
  // ];
  const tasks = [];

  const taskList = (tasks) => (
    <ul className="task-list">
      {tasks.map(({ id, name, date }) => (
        <li key={id}>
          <button className="button">
            <img
              src="/icons/Ellipse.svg"
              alt="logo fiap"
              className="exit-logo"
            />
            <div className="task-text">
              <span className="task-description">{name}</span>
              <span className="task-conclusion">{`Conclusão em: ${date}`}</span>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );

  const emptyList = () => (
    <div className="empty-list">
      <img src="/icons/NotFound.svg" alt="logo fiap" className="not-found" />
      <span className="empty-list-text">
        Você ainda não possui tarefas cadastradas!
      </span>
    </div>
  );

  return (
    <div className="container-main">
      <header className="header">
        <img src="/icons/Logo.svg" alt="logo fiap" className="logo" />
        <div>
          <span>{`Olá, ${firstName}`}</span>
          <img
            src="/icons/ExitMobile.svg"
            alt="logo fiap"
            className="exit-logo"
          />
        </div>
      </header>
      <div>
        <button className="button filter">
          <span>Tarefas</span>
          <img src="/icons/Filtro.svg" alt="logo fiap" className="exit-logo" />
        </button>
        {tasks.length ? taskList(tasks) : emptyList()}
      </div>
      <button className="footer button add-task">Adicionar uma tarefa</button>
    </div>
  );
};
