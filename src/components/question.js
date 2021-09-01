import { useState, useEffect } from "react";
import Next from "./nextQuestion";

const Question = ({currentQuestion, nextQuestion }) => {

    const [toggleNext, setToggleNext] = useState(false);
    const [answeredCorrect, setAnsweredCorrect] = useState(false);
    const [choises, setChoises] = useState([]);
    const [clicked, setClicked] = useState(false)
    const [btnDisabled, setBtnDisabled] = useState(false)
    const [btnColors, setBtnColors] = useState({
        btn_0: ["unset", "unset"],
        btn_1: ["unset", "unset"],
        btn_2: ["unset", "unset"],
        btn_3: ["unset", "unset"]
    });

    useEffect(() => {
        
        if (currentQuestion.type === 'boolean') {
            setChoises(['True', 'False', '', '']);
            
        } else {
            
            let _choises;
            
            _choises = currentQuestion.incorrect_answers.map(current => decodeURIComponent(current));
            const randomIndex = Math.floor(Math.random() * 4);
            _choises.splice(randomIndex, 0, decodeURIComponent(currentQuestion.correct_answer));
            
            setChoises(_choises);
        }
        
        setBtnDisabled(false);
        setToggleNext(false);
        setAnsweredCorrect(false);
        setBtnColors({
            btn_0: ["unset", "unset"],
            btn_1: ["unset", "unset"],
            btn_2: ["unset", "unset"],
            btn_3: ["unset", "unset"]
        });
        

    }, [currentQuestion])

    const toggleNextComp = (e) => {

        if (e.target.value === decodeURIComponent(currentQuestion.correct_answer)) {
            setAnsweredCorrect(true);
        }

        const colorChanges = { [`btn_${e.target.getAttribute('data-id')}`]: ["black", "white"] };
        setBtnColors({ ...btnColors, ...colorChanges });
        setBtnDisabled(true);
        setToggleNext(!toggleNext);

    }

    return (
        <main>
            <p className="question">{decodeURIComponent(currentQuestion.question)}</p>

            <div className="choise-wrapper">
                <div className="choises">
                    <button className="btn-choise" data-id="0"
                        style={{ backgroundColor: btnColors.btn_0[0], color: btnColors.btn_0[1] }}
                        disabled={btnDisabled} value={choises[0]} onClick={(e) => {
                            toggleNextComp(e);
                        }}>{choises[0]}</button>
                    <button className="btn-choise" data-id="1"
                        style={{ backgroundColor: btnColors.btn_1[0], color: btnColors.btn_1[1] }}
                        disabled={btnDisabled} value={choises[1]} onClick={(e) => {
                            toggleNextComp(e);
                        }}>{choises[1]}</button>
                </div>
                <div className="choises">
                    {currentQuestion.type !== 'boolean' &&
                        <>
                            <button className="btn-choise" data-id="2"
                                style={{ backgroundColor: btnColors.btn_2[0], color: btnColors.btn_2[1] }}
                                disabled={btnDisabled} value={choises[2]} onClick={(e) => {
                                    toggleNextComp(e);
                                }}>{choises[2]}</button>
                            <button className="btn-choise" data-id="3"
                                style={{ backgroundColor: btnColors.btn_3[0], color: btnColors.btn_3[1] }}
                                disabled={btnDisabled} value={choises[3]} onClick={(e) => {
                                    toggleNextComp(e);
                                }}>{choises[3]}</button>
                        </>
                    }
                </div>
            </div>
            <div className="next-question">
                {toggleNext && <Next answeredCorrect={answeredCorrect} nextQuestion={nextQuestion} />}
            </div>
        </main>
    );
}

export default Question