import { useState } from "react";

import Header from "./components/Header";
import Question from "./components/Question";
import ScoreBars from "./components/ScoreBars";
import ProgressBar from "./components/ProgressBar";
import questions from "./questions";

function App() {
  const [currentQtnNo, setCurrentQtn] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  const qtnAnswered = (answeredCorrect) => {
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
          currentQtnNo={currentQtnNo}
          nextQuestion={() => setCurrentQtn(currentQtnNo + 1)}
          qtnAnswered={qtnAnswered}
        />
      )}

      {currentQtnNo === questions.length && (
        <div className="center_all">
          <h1>Completed</h1>
          <h2>
            Score {Math.floor((correctAnswers * 100) / questions.length)}%
          </h2>
        </div>
      )}
      <ProgressBar numOfQtns={questions.length} qtnNum={currentQtnNo + 1} />
      <ScoreBars
        wrongAnswers={wrongAnswers}
        correctAnswers={correctAnswers}
        numOfQtns={questions.length}
        qtnNum={currentQtnNo + 1}
      />
    </>
  );
}

export default App;
