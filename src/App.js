import { useState } from "react";

import Header from "./components/header";
import Question from "./components/question";
import ProgressBars from "./components/progressBars";
import _questions from "./questions";

function App() {

  const questions = _questions;

  const [currentQtn, setCurrentQtn] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  const nextQuestion = (answeredCorrect) => {
    console.log("Question answered");

    if (currentQtn !== questions.length - 1) {

      setCurrentQtn(currentQtn + 1);

      if (!answeredCorrect) {
        console.log(answeredCorrect);
        setWrongAnswers(wrongAnswers + 1);
      } else {
        setCorrectAnswers(correctAnswers + 1)
      }

    }
    else {
      setCurrentQtn(0)
      setCorrectAnswers(0);
      setWrongAnswers(0);
    };


  }

  console.log(wrongAnswers)
  console.log("correct answer: ", correctAnswers)
  return (
    <>
      <Header numOfQtns={questions.length} qtnNum={currentQtn + 1}
        qtnCategory={questions[currentQtn].category} qtnDifficulty={questions[currentQtn].difficulty} />
      <Question currentQuestion={questions[currentQtn]} nextQuestion={nextQuestion} />
      <ProgressBars wrongAnswers={wrongAnswers} numOfQtns={questions.length}
        qtnNum={currentQtn + 1} correctAnswers={correctAnswers} />
    </>
  );
}

export default App;
