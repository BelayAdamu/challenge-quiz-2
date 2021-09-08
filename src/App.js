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

  const nextQuestion = () => {
    
    setCurrentQtn(currentQtn + 1);
    
  }
  
  const qtnAnswered = (answeredCorrect) => {
    
    if (!answeredCorrect) {
      console.log(answeredCorrect);
      setWrongAnswers(wrongAnswers + 1);
    } else {
      setCorrectAnswers(correctAnswers + 1)
    }
    
  }

  return (
    <>
      {(currentQtn < questions.length) && <Header
        numOfQtns={questions.length}
        qtnNum={currentQtn + 1}
        qtnCategory={questions[currentQtn].category}
        qtnDifficulty={questions[currentQtn].difficulty} />}

      {
        (currentQtn === questions.length) && <div className="center_all">
          <h1>Completed</h1>
          <h2>Score {Math.floor((correctAnswers * 100) / questions.length)}%</h2>
        </div>
      }

      {(currentQtn < questions.length) && <Question currentQuestion={questions[currentQtn]} nextQuestion={nextQuestion} qtnAnswered = {qtnAnswered}/>}
      
      <ProgressBars wrongAnswers={wrongAnswers} numOfQtns={questions.length}
        qtnNum={currentQtn + 1} correctAnswers={correctAnswers} />
    </>
  );
}

export default App;
