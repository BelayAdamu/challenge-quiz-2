import { useState, useEffect } from "react";
import Next from "./nextQuestion";

const Question = ({ currentQuestion, nextQuestion, qtnAnswered }) => {

    const [showNextButton, setShowNextButton] = useState(false);
    const [answeredCorrect, setAnsweredCorrect] = useState(false);
    const [choices, setChoices] = useState([]);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [abtnWasClicked, setABtnWasClicked] = useState(false);

    useEffect(() => {

        if (currentQuestion.type === 'boolean') {
            setChoices(['True', 'False']);

        } else {

            let _choices;

            _choices = currentQuestion.incorrect_answers.map(current => decodeURIComponent(current));
            const randomIndex = Math.floor(Math.random() * 4);
            _choices.splice(randomIndex, 0, decodeURIComponent(currentQuestion.correct_answer));

            setChoices(_choices);
        }

        setBtnDisabled(false);
        setShowNextButton(false);
        setAnsweredCorrect(false);
        setABtnWasClicked(false);


    }, [currentQuestion])

    function toggleNextComp(e) {

        if (e.target.value === decodeURIComponent(currentQuestion.correct_answer)) {
            setAnsweredCorrect(true);
        }

        setBtnDisabled(true);
        setShowNextButton(!showNextButton);

    }

    return (
        <main>
            <p className="question">{decodeURIComponent(currentQuestion.question)}</p>

            <div className="choise-wrapper">
                {choices.map((choice, i) => {
                    return <ChoiceButton key={choice} choice={choice} i={i} disabled={btnDisabled} clicked={toggleNextComp}
                            correctAnswer ={decodeURIComponent(currentQuestion.correct_answer)} abtnWasClicked={abtnWasClicked} setABtnWasClicked = {setABtnWasClicked} />;
                })}
            </div>
            <div className="next-question">
                {showNextButton && <Next answeredCorrect={answeredCorrect} nextQuestion={nextQuestion} qtnAnswered = {qtnAnswered} />}
            </div>
            
        </main>
    );
}

function ChoiceButton({ choice, i, disabled, clicked, correctAnswer, abtnWasClicked, setABtnWasClicked }) {
    const [thisBtnWasClicked, setThisBtnWasClicked] = useState(false);
    
    // This makes sure that thisBtnWasClicked is false at every re-render
    useEffect(() => {
        setThisBtnWasClicked(false);    
    }, [])
    
    let btnStyle;
    
    if(abtnWasClicked && !thisBtnWasClicked && choice === correctAnswer) {
        
       btnStyle = {backgroundColor: "green", color: "white"};

    } 
    else if(abtnWasClicked && thisBtnWasClicked) {
        
        btnStyle = {backgroundColor: "black", color: "white"};  
        
    }  else {
        
        btnStyle = {};
    }
     
    return <button className="btn-choise" data-id={i}
                style={btnStyle}
                disabled={disabled} value={choice} onClick={(e) => {
                    setThisBtnWasClicked(true);
                    setABtnWasClicked(true);
                    clicked(e);
            }}>{choice}</button>
}

export default Question