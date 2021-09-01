import { useState } from "react";

import Header from "./components/header";
import Question from "./components/question";
import ProgressBars from "./components/progressBars";
import _questions from "./questions";

function App() {
  
  const questions = _questions;
  
  let [currentQtn, setCurrentQtn] = useState(0);
  let [qtnAsked, setQtnAsked] = useState(0);
  let [wrongAnswers, addWrongAnswer] = useState(0);
  
  const nextQuestion = () => {
    console.log("Question answered");
    setCurrentQtn(currentQtn + 1);
  }

 
  return (
    <>
      <Header />
      <Question currentQuestion = {questions[currentQtn]} nextQuestion = {nextQuestion}/>
      <ProgressBars />
    </>
  );
}

export default App;
