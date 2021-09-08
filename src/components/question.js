import { useState, useEffect } from "react";
import Next from "./nextQuestion";
import ChoiceButton from "./ChoiseButton";

const Question = ({
  currentQuestion,
  nextQuestion,
  qtnAnswered,
  currentQtnNo,
}) => {
  const [showNextButton, setShowNextButton] = useState(false);
  const [answeredCorrect, setAnsweredCorrect] = useState(false);
  const [choices, setChoices] = useState([]);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [aBtnWasClicked, setABtnWasClicked] = useState(false);

  useEffect(() => {
    if (currentQuestion.type === "boolean") {
      setChoices(["True", "False"]);
    } else {
      let _choices;
      _choices = currentQuestion.incorrect_answers.map((current) =>
        decodeURIComponent(current)
      );
      const randomIndex = Math.floor(Math.random() * 4);
      _choices.splice(
        randomIndex,
        0,
        decodeURIComponent(currentQuestion.correct_answer)
      );

      setChoices(_choices);
    }

    setBtnDisabled(false);
    setShowNextButton(false);
    setAnsweredCorrect(false);
    setABtnWasClicked(false);
  }, [currentQuestion]);

  function handleChoiceBtnClick(e) {
    setBtnDisabled(true);
    setShowNextButton(!showNextButton);
    if (e.target.value === decodeURIComponent(currentQuestion.correct_answer)) {
      setAnsweredCorrect(true);
      qtnAnswered(true);
    } else {
      qtnAnswered(false);
    }
  }

  return (
    <main>
      <p className="question">{decodeURIComponent(currentQuestion.question)}</p>

      <div className="choise-wrapper">
        {choices.map((choice, i) => {
          return (
            <ChoiceButton
              key={`Qtn-${currentQtnNo}-${choice}`}
              choice={choice}
              i={i}
              disabled={btnDisabled}
              handleClick={handleChoiceBtnClick}
              correctAnswer={decodeURIComponent(currentQuestion.correct_answer)}
            />
          );
        })}
      </div>
      <div className="next-question">
        {showNextButton && (
          <Next answeredCorrect={answeredCorrect} handleClick={nextQuestion} />
        )}
      </div>
    </main>
  );
};

export default Question;
