/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { getTaskInputInterface } from "../services/task";

interface selectOptions {
  text: string;
  value: string;
}

export const Filter = ({
  applyFilter,
}: {
  applyFilter: (data: getTaskInputInterface) => void;
}) => {
  const [filterModalShow, setFilterTaskModalShow] = useState(false);
  const [previsionDateStart, setPrevisionDateStart] = useState("");
  const [previsionDateEnd, setPrevisionDateEnd] = useState("");
  const [status, setStatus] = useState("0");

  const submitFilter = () => {
    applyFilter({
      status,
      previsionDateStart,
      previsionDateEnd,
    });
    setFilterTaskModalShow(false);
  };

  const submitOnBlur = () => {
    if (!filterModalShow) {
      submitFilter();
    }
  };

  const options = [
    {
      value: "0",
      text: "Todas",
    },
    {
      value: "1",
      text: "Ativas",
    },
    {
      value: "2",
      text: "Concluídas",
    },
  ];

  useEffect(() => {
    submitOnBlur();
  }, [previsionDateStart, previsionDateEnd, status]);

  const optionsComponent = (optionsToMap: selectOptions[]) =>
    optionsToMap.map(({ value, text }) => (
      <option value={value} key={value}>
        {text}
      </option>
    ));

  return (
    <>
      <Modal
        show={filterModalShow}
        className="container-modal"
        onHide={() => {
          setFilterTaskModalShow(false);
        }}
      >
        <Modal.Body>
          <p>Filtrar tarefas</p>
          <div className="inputs">
            <input
              type={previsionDateStart ? "date" : "text"}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) =>
                previsionDateStart
                  ? (e.target.type = "date")
                  : (e.target.type = "text")
              }
              value={previsionDateStart}
              placeholder="Data de início"
              onChange={(e) => setPrevisionDateStart(e.target.value)}
            />
            <input
              type={previsionDateEnd ? "date" : "text"}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) =>
                previsionDateEnd
                  ? (e.target.type = "date")
                  : (e.target.type = "text")
              }
              value={previsionDateEnd}
              placeholder="Data de conclusão"
              onChange={(e) => setPrevisionDateEnd(e.target.value)}
            />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              {optionsComponent(options)}
            </select>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <div className="button col-12">
            <button onClick={submitFilter}>Aplicar Filtro</button>
            <span onClick={() => setFilterTaskModalShow(false)}>Cancelar</span>
          </div>
        </Modal.Footer>
      </Modal>

      <div className="filter-container">
        <button
          className="button filter"
          onClick={() => setFilterTaskModalShow(true)}
        >
          <span>Tarefas</span>
          <img src="/icons/Filtro.svg" alt="" />
        </button>
        <section className="filter">
          <span>Tarefas</span>
          <div className="input-container">
            <div>
              <label>Data prevista de conclusão:</label>
              <input
                type={previsionDateStart ? "date" : "text"}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) =>
                  previsionDateStart
                    ? (e.target.type = "date")
                    : (e.target.type = "text")
                }
                value={previsionDateStart}
                placeholder=""
                onChange={(e) => setPrevisionDateStart(e.target.value)}
              />
            </div>
            <div>
              <label>até</label>
              <input
                type={previsionDateEnd ? "date" : "text"}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) =>
                  previsionDateEnd
                    ? (e.target.type = "date")
                    : (e.target.type = "text")
                }
                value={previsionDateEnd}
                placeholder=""
                onChange={(e) => setPrevisionDateEnd(e.target.value)}
              />
            </div>
            <div>
              <label>Status</label>
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                {optionsComponent(options)}
              </select>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
