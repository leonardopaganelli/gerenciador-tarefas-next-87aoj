import React, { useEffect, useRef, useState } from "react";
import {
  getTaskList,
  addTask,
  editTask,
  createTaskInputInterface,
  getTaskInputInterface,
} from "../services/task";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { TaskList } from "../components/TaskList";
import { Filter } from "../components/Filter";
import { TaskModal } from "../components/TaskModal";
import { Task } from "../types/Task";
import { compareObjects } from "../util/compareObjects";

export const Main = () => {
  const [showModal, setModalShow] = useState(false);
  const [taskList, setTaskList] = useState([] as Task[]);
  const [filterParams, setFilterParams] = useState({
    status: "0",
    previsionDateStart: "",
    previsionDateEnd: "",
  } as getTaskInputInterface);
  const [customError, setCustomError] = useState("");
  const [taskToEdit, setTaskToEdit] = useState({} as Task);

  const convertDate = (date: string): string =>
    date
      ? new Date(date)
          .toISOString()
          .substr(0, 10)
          .split("-")
          .reverse()
          .join("/")
      : "";

  const fetchTaskList = async () => {
    const { data } = await getTaskList(filterParams);

    const taskListMapped = data?.map((singleTask) => ({
      ...singleTask,
      previsionDate: convertDate(singleTask.previsionDate),
      finishDate: convertDate(singleTask.finishDate || ""),
    }));
    setTaskList(taskListMapped as Task[]);
  };

  useEffect(() => {
    fetchTaskList();
  }, [filterParams]);

  const addNewTask = async (task: createTaskInputInterface) => {
    try {
      await addTask(task);
      setModalShow(false);
      setCustomError("");
      fetchTaskList();
    } catch (e: any) {
      if (e) {
        setCustomError(e);
      } else {
        setCustomError("Ocorreu erro ao tentar cadastrar tarefa");
      }
    }
  };

  const editCurrentTask = async (task: Task) => {
    try {
      await editTask(task);
      setModalShow(false);
      setCustomError("");
      setTaskToEdit({} as Task);
      fetchTaskList();
    } catch (e: any) {
      if (e) {
        setCustomError(e);
      } else {
        setCustomError("Ocorreu erro ao tentar cadastrar tarefa");
      }
    }
  };

  return (
    <div className="container-main">
      <Header addTaskCallback={() => setModalShow(true)} />
      <div>
        <Filter
          applyFilter={(params) => {
            if (!compareObjects(params, filterParams)) {
              setFilterParams(params);
            }
          }}
        />
        <TaskList
          list={taskList}
          selectItem={(item) => {
            setTaskToEdit(item);
            setModalShow(true);
          }}
        />
      </div>
      <TaskModal
        addTaskCallback={addNewTask}
        editTaskCallback={editCurrentTask}
        closeModalCallback={() => {
          setModalShow(false);
          setCustomError("");
          setTaskToEdit({} as Task);
        }}
        taskToEdit={taskToEdit}
        customError={customError}
        showModal={showModal}
      />
      <Footer addTaskCallback={() => setModalShow(true)} />
    </div>
  );
};
