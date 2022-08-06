import React, { useContext, useEffect, useRef, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import task from "../pages/api/task";
import { AuthContext, AuthContextInterface } from "../providers/auth.provider";
import { getTaskList, taskData } from "../services/task";
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
      .split('-')
      .reverse()
      .join('/')
  }
  
  useEffect(() => {
    if (effectRan.current === true) {
      getTaskList()
        .then(({ data }) =>{
          const taskListMapped = data?.map((singleTask) => ({
            ...singleTask,
            previsionDate: convertDate(singleTask.previsionDate)
          }))
          console.log(taskListMapped)
          setTaskList(taskListMapped as taskData[])
        });
    }

    return () => {
      effectRan.current = true;
    };
  }, []);

  const submitAddTask = (event) => {
    event.preventDefault();
  }

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
        onHide={()=> { setAddTaskModalShow(false)}}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Adicionar uma tarefa
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div onSubmit={submitAddTask}>
            <div className="inputs">
              <input type="text" name="name" placeholder="Adicionar uma tarefa" />
              <input type="date" name="date" placeholder="Data de conclusão" />
            </div>
            <div className="buttons">
              <button className="salvar">
                Salvar
              </button>
              <button onClick={() => setAddTaskModalShow(false)} className="salvar">
                Cancelar
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Footer addTaskCallback={() => setAddTaskModalShow(true)} />
    </div>
  );
};
