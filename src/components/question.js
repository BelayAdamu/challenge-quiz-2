import { useState, useEffect } from "react";
import Next from "./nextQuestion";

const Question = ({ currentQuestion, nextQuestion }) => {

    const [showNextButton, setShowNextButton] = useState(false);
    const [answeredCorrect, setAnsweredCorrect] = useState(false);
    const [choices, setChoises] = useState([]);
    const [clicked, setClicked] = useState(false)
    const [btnDisabled, setBtnDisabled] = useState(false)

    useEffect(() => {

        if (currentQuestion.type === 'boolean') {
            setChoises(['True', 'False']);

        } else {

            let _choises;

            _choises = currentQuestion.incorrect_answers.map(current => decodeURIComponent(current));
            const randomIndex = Math.floor(Math.random() * 4);
            _choises.splice(randomIndex, 0, decodeURIComponent(currentQuestion.correct_answer));

            setChoises(_choises);
        }

        setBtnDisabled(false);
        setShowNextButton(false);
        setAnsweredCorrect(false);


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
                    return <ChoiceButton key={choice} choice={choice} i={i} disabled={btnDisabled} clicked={toggleNextComp} />;
                })}
            </div>
            <div className="next-question">
                {showNextButton && <Next answeredCorrect={answeredCorrect} nextQuestion={nextQuestion} />}
            </div>
        </main>
    );
}

function ChoiceButton({ choice, i, disabled, clicked }) {
    const [correctChoice, setCorrectChoice] = useState(false);

    return <button className="btn-choise" data-id={i}
        style={correctChoice ? { backgroundColor: "black", color: "white" } : {}}
        disabled={disabled} value={choice} onClick={(e) => {
            setCorrectChoice(true);

            clicked(e);
        }}>{choice}</button>
}

export default Question