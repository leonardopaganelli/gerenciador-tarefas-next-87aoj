/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';

export const Filter = () => {
    const [filterModalShow, setFilterTaskModalShow] = useState(false);

    const submitFilter = (event) => {
        event.preventDefault();
    }

    const options = [
        {
            value: "T",
            text: "Todas"
        },
        
        {
            value: "A",
            text: "Ativas"
        },
        
        {
            value: "C",
            text: "Concluídas"
        }
    ]

    const optionsComponent = (optionsToMap) => optionsToMap.map(({ value, text }) => (
        <option value={value} key={value}>{text}</option>)
    )

    return (
        <>
            <Modal
            show={filterModalShow}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={()=> { setFilterTaskModalShow(false)}}
        >
            <Modal.Header closeButton>
            <Modal.Title>
                Filtrar tarefas
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div onSubmit={submitFilter}>
                <div className="inputs">
                <input type="date" name="date" placeholder="Data de conclusão" />
                <input type="date" name="date" placeholder="Data de conclusão" />
                <select name="option">
                    { optionsComponent(options) }
                </select>
                </div>
                <div className="buttons">
                <button className="salvar">
                    Aplicar Filtros
                </button>
                <button onClick={() => setFilterTaskModalShow(false)} className="salvar">
                    Cancelar
                </button>
                </div>
            </div>
            </Modal.Body>
        </Modal>

        <div className="filter-container">
            <button className="button filter" onClick={() => setFilterTaskModalShow(true)}>
                <span>Tarefas</span>
                <img src="/icons/Filtro.svg" alt="" />
            </button>
            <section className="filter">
                <span>Tarefas</span>
                <div className="input-container">
                    <div>
                        <label>
                            Data prevista de conclusão:
                        </label>
                        <input type="date" name="dateStart"  />
                    </div>
                    <div>
                        <label>
                            até
                        </label>
                        <input type="date" name="dateEnd" />
                    </div>
                    <div>
                        <label>
                            Status
                        </label>
                        <select name="option">
                            { optionsComponent(options) }
                        </select>
                    </div>
                </div>
            </section>
        </div>
        </>

    )
}