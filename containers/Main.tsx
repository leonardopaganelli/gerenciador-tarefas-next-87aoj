import React, { useContext, useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import task from "../pages/api/task";
import { AuthContext, AuthContextInterface } from "../providers/auth.provider";
import {
  getTaskList,
  taskData,
  addTask,
  createTaskInputInterface,
} from "../services/task";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { TaskList } from "../components/TaskList";
import { Filter } from "../components/Filter";

export const Main = () => {
  const effectRan = useRef(false);
  const [addModalShow, setAddTaskModalShow] = useState(false);

  const [taskList, setTaskList] = useState([] as taskData[]);

  const convertDate = (date: string): string => {
    return new Date(date)
      .toISOString()
      .substr(0, 10)
      .split("-")
      .reverse()
      .join("/");
  };

  const fetchTaskList = async () => {
    const { data } = await getTaskList();

    const taskListMapped = data?.map((singleTask) => ({
      ...singleTask,
      previsionDate: convertDate(singleTask.previsionDate),
    }));
    setTaskList(taskListMapped as taskData[]);
  };

  useEffect(() => {
    if (effectRan.current === true) {
      fetchTaskList();
    }

    return () => {
      effectRan.current = true;
    };
  }, []);

  const submitAddTask = async (event: unknown) => {
    event.preventDefault();
    console.log(event);
    const formValues: createTaskInputInterface = {
      name: event?.target?.name?.value,
      previsionDate: event?.target?.date?.value,
    };
    console.log(formValues);
    const data = await addTask(formValues);
    console.log(data);
  };

  return (
    <div className="container-main">
      <Header addTaskCallback={() => setAddTaskModalShow(true)} />
      <div>
        <Filter />
        <TaskList list={taskList} />
      </div>

      <Modal
        show={addModalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => {
          setAddTaskModalShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Adicionar uma tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={submitAddTask}>
            <div className="inputs">
              <input
                type="text"
                name="name"
                placeholder="Adicionar uma tarefa"
              />
              <input type="date" name="date" placeholder="Data de conclusão" />
            </div>
            <div className="buttons">
              <button className="salvar">Salvar</button>
              <button
                onClick={() => setAddTaskModalShow(false)}
                className="salvar"
              >
                Cancelar
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Footer addTaskCallback={() => setAddTaskModalShow(true)} />
    </div>
  );
};
