import { useState, useEffect } from "react";

function ChoiceButton({
  choice,
  i,
  disabled,
  handleClick,
  correctAnswer,
}) {
  const [thisBtnWasClicked, setThisBtnWasClicked] = useState(false);

  // This makes sure that thisBtnWasClicked is false at every re-render
  useEffect(() => {
    setThisBtnWasClicked(false);
  }, []);

  let btnStyle;

  if (disabled && !thisBtnWasClicked && choice === correctAnswer)
    btnStyle = { border: "3px solid green", color: "black" };
  else if (disabled && thisBtnWasClicked)
    btnStyle = { backgroundColor: "black", color: "white" };
  else btnStyle = {};

  return (
    <button
      className="btn-choise"
      data-id={i}
      style={btnStyle}
      disabled={disabled}
      value={choice}
      onClick={(e) => {
        setThisBtnWasClicked(true);
        handleClick(e);
      }}
    >
      {choice}
    </button>
  );
}

export default ChoiceButton;
