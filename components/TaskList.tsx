/* eslint-disable @next/next/no-img-element */
import React, { useContext} from "react";
import { AuthContext, AuthContextInterface } from "../providers/auth.provider";
import { taskData } from "../services/task"
interface FooterInterface {
    list: taskData[];
}

export const TaskList = ({ list = [] }: FooterInterface) => {
    const taskListComponent = (tasks: taskData[]) => (
        <ul className="task-list">
            {tasks.map(({ _id, name, previsionDate }) => (
            <li key={_id}>
                <button className="button">
                <img
                    src="/icons/Ellipse.svg"
                    alt="logo fiap"
                    className="exit-logo"
                />
                <div className="task-text">
                    <span className="task-description">{name}</span>
                    <span className="task-conclusion">{`Conclusão em: ${previsionDate}`}</span>
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

    return list.length ? taskListComponent(list) : emptyList()
}