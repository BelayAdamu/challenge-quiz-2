import { useState } from "react";

import Header from "./components/header";
import Question from "./components/question";
import ProgressBars from "./components/progressBars";
import _questions from "./questions";

function App() {
  const questions = _questions; //1

  const [currentQtnNo, setCurrentQtn] = useState(0); //currentQtnNo
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  const qtnAnswered = (answeredCorrect) => {
    //updateScore
    answeredCorrect
      ? setCorrectAnswers(correctAnswers + 1)
      : setWrongAnswers(wrongAnswers + 1);
  };

  return (
    <>
      {currentQtnNo < questions.length && (
        <Header
          numOfQtns={questions.length}
          qtnNum={currentQtnNo + 1}
          qtnCategory={questions[currentQtnNo].category}
          qtnDifficulty={questions[currentQtnNo].difficulty}
        />
      )}

      {currentQtnNo < questions.length && (
        <Question
          currentQuestion={questions[currentQtnNo]}
          currentQtnNo = {currentQtnNo}
          nextQuestion={()=> setCurrentQtn(currentQtnNo + 1)}
          qtnAnswered={qtnAnswered}
        />
      )}
      
      {
        //TODO: update the css
        currentQtnNo === questions.length && (
          <div className="center_all">
            <h1>Completed</h1>
            <h2>
              Score {Math.floor((correctAnswers * 100) / questions.length)}%
            </h2>
          </div>
        )
      }

      <ProgressBars
        wrongAnswers={wrongAnswers}
        correctAnswers={correctAnswers}
        numOfQtns={questions.length}
        qtnNum={currentQtnNo + 1}
      />
    </>
  );
}

export default App;
