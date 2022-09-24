import React, { useEffect, useMemo, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Task } from "../types/Task";
import { verifyNullOrEmpty } from "../util/verifyNullOrEmpty";

interface TaskModal {
  addTaskCallback: (event: Task) => void;
  editTaskCallback: (event: Task) => void;
  closeModalCallback: () => void;
  showModal: boolean;
  taskToEdit?: Task;
  customError: string;
}

export const TaskModal = ({
  addTaskCallback,
  editTaskCallback,
  closeModalCallback,
  showModal,
  taskToEdit,
  customError,
}: TaskModal) => {
  const [error, setError] = useState("");
  const [name, setName] = useState(taskToEdit?.name || "");
  const [modalPrevisionDateStart, setModalPrevisionDateStart] = useState(
    taskToEdit?.previsionDate || ""
  );
  const [modalPrevisionDateEnd, setModalPrevisionDateEnd] = useState(
    taskToEdit?.finishDate || ""
  );
  const isEditing = useMemo(() => {
    return !!Object.values(taskToEdit || {}).length;
  }, [taskToEdit]);

  const resetModal = () => {
    setError("");
    setName("");
    setModalPrevisionDateStart("");
    setModalPrevisionDateEnd("");
  };

  const normalizeDate = (date: string | undefined): string =>
    date ? date.split("/").reverse().join("-") : "";

  const setTaskToEdit = () => {
    setName(taskToEdit?.name || "");
    setModalPrevisionDateStart(normalizeDate(taskToEdit?.previsionDate));
    setModalPrevisionDateEnd(normalizeDate(taskToEdit?.finishDate));
  };

  useEffect(() => {
    if (!showModal) {
      resetModal();
    }
  }, [showModal]);

  useEffect(() => {
    if (isEditing) {
      setTaskToEdit();
    }
  }, [isEditing]);

  const validateForm = () => {
    const fieldToValidate = [name, modalPrevisionDateStart];
    if (fieldToValidate.some((item) => verifyNullOrEmpty(item))) {
      setError("Favor preencher o formulário");
      return false;
    }

    return true;
  };

  const submitForm = () => {
    let paramsToSend = {
      name: name,
      previsionDate: modalPrevisionDateStart,
    };

    isEditing
      ? editTaskCallback({
          ...paramsToSend,
          finishDate: modalPrevisionDateEnd,
          _id: taskToEdit?._id,
        })
      : addTaskCallback(paramsToSend);
  };

  return (
    <Modal
      show={showModal}
      className="container-modal"
      onHide={() => {
        closeModalCallback();
      }}
    >
      <Modal.Body>
        <p>Adicionar Tarefa</p>
        {(error || customError) && (
          <p className="error">{error || customError}</p>
        )}
        <div className="inputs">
          <input
            type="text"
            placeholder="Adicionar uma tarefa"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type={modalPrevisionDateStart ? "date" : "text"}
            placeholder="Data de previsão"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) =>
              modalPrevisionDateStart
                ? (e.target.type = "date")
                : (e.target.type = "text")
            }
            value={modalPrevisionDateStart}
            onChange={(e) => setModalPrevisionDateStart(e.target.value)}
          />
          {isEditing && (
            <input
              type={modalPrevisionDateEnd ? "date" : "text"}
              placeholder="Data de conclusão"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) =>
                modalPrevisionDateEnd
                  ? (e.target.type = "date")
                  : (e.target.type = "text")
              }
              value={modalPrevisionDateEnd}
              onChange={(e) => setModalPrevisionDateEnd(e.target.value)}
            />
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="button col-12">
          <button onClick={() => validateForm() && submitForm()}>Salvar</button>
          <span
            onClick={() => {
              closeModalCallback();
              resetModal();
            }}
          >
            Cancelar
          </span>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
