import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

export const Card = ({ card }) => {
  const frontEl = useRef();
  const backEl = useRef();
  const [height, setHeight] = useState("initial");

  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 100));
  }

  useEffect(setMaxHeight, [card.question, card.answer, card.options]);

  const [flip, setFlip] = useState(false);
  return (
    <div
      className={`card ${flip ? "flip" : " "}`}
      onClick={() => setFlip(!flip)}
      style={{ height: height }}
    >
      <div className="front" ref={frontEl}>
        {card.question}
        <div className="options">
          {card.options.map((option) => {
            return (
              <div className="option" key={Math.floor(Math.random() * 10000)}>
                {option}
              </div>
            );
          })}
        </div>
      </div>
      <div className="back" ref={backEl}>
        {card.answer}
      </div>
    </div>
  );
};
