/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Task } from "../types/Task";
interface FooterInterface {
  list: Task[];
  selectItem: (task: Task) => void;
}

export const TaskList = ({ list = [], selectItem }: FooterInterface) => {
  const taskListComponent = (tasks: Task[]) => (
    <ul className="task-list">
      {tasks.map(({ _id, name, previsionDate, finishDate }) => (
        <li key={_id}>
          <button
            className={`button ${finishDate ? "closed" : ""}`}
            onClick={() => selectItem({ _id, name, previsionDate, finishDate })}
          >
            <img
              src={finishDate ? "/icons/Check.svg" : "/icons/Ellipse.svg"}
              alt="logo fiap"
              className="exit-logo"
            />
            <div className="task-text">
              <span className="task-description">{name}</span>
              <span className="task-conclusion">{`${
                finishDate ? "Concluído" : "Previsão"
              } em: ${finishDate || previsionDate}`}</span>
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

  return list.length ? taskListComponent(list) : emptyList();
};
