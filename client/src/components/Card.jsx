import React, { useRef, useState } from "react";
import { shortenDescription } from "../utils/shortenDesc";
import "./Card.css";

const Card = ({ data, select, setSelect }) => {
  return (
    <>
      {data &&
        data.map((i, idx) => (
          <div className="card" key={idx}>
            <img src={i.image} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{i.name}</h5>
              <p className="card-text">{shortenDescription(i.description)}</p>
              <button
                key={idx}
                onClick={() => {
                  !select.includes(idx)
                    ? setSelect((select) => [...select, idx])
                    : setSelect(select.filter((button) => button !== idx));
                }}
                className={
                  select.includes(idx)
                    ? "button table_btn_s"
                    : "button table_btn_ns"
                }
              >
                선택
              </button>
            </div>
          </div>
        ))}
    </>
  );
};

export default Card;
