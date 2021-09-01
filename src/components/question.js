import { useState } from "react";
import Next from "./nextQuestion";

var clicked = false
var choises = [];

const Question = ({currentQuestion, nextQuestion}) => {
    
    const [toggleNext, setToggleNext] = useState(false);
    const [answeredCorrect, setAnsweredCorrect] = useState(false);
    const [btnDisabled, disableBtn] = useState(false)
    const [btnColors, changeBtnColors] = useState({btn_0: ["none", "none"],
                                                 btn_1: ["none", "none"],
                                                 btn_2: ["none", "none"],
                                                 btn_3: ["none", "none"]})

    
    var _choises, toggler=false;

    
    const generateChoises = () => {
        
        if(currentQuestion.type === 'boolean'){
            choises = ['True', 'False', '' , '']
        } else {
            _choises = currentQuestion.incorrect_answers.map(current => decodeURIComponent(current));
            const randomIndex = Math.floor(Math.random()*4);
            _choises.splice(randomIndex,0, decodeURIComponent(currentQuestion.correct_answer));
        }
        
        if (!clicked && currentQuestion.type !== 'boolean'){
            choises = _choises;
            clicked = true;
        }
            
    }
    
    generateChoises();
    
    const toggleNextComp = (e) => {
        
        console.log(btnColors[`btn_${e.target.getAttribute('data-id')}`],  e.target.getAttribute('data-id'));
        if (e.target.value === decodeURIComponent(currentQuestion.correct_answer))
        {
            setAnsweredCorrect(true);
        }
        
        const colorChanges = {[`btn_${e.target.getAttribute('data-id')}`]: ["black", "white"]};
        changeBtnColors({...btnColors, ...colorChanges});
        disableBtn(true);
        setToggleNext(!toggleNext);

    }
    
    return (
        <main>
            <p className="question">{decodeURIComponent(currentQuestion.question)}</p>
            
            <div className="choise-wrapper">
                <div className="choises">
                    <button className="btn-choise" data-id = "0" 
                        style={{backgroundColor: btnColors.btn_0[0], color:btnColors.btn_0[1]}} 
                        disabled={btnDisabled} value={choises[0]} onClick={(e) => {
                            toggleNextComp(e);
                    }}>{choises[0]}</button>
                    <button className="btn-choise" data-id = "1" 
                        style={{backgroundColor: btnColors.btn_1[0], color:btnColors.btn_1[1]}} 
                        disabled={btnDisabled} value={choises[1]} onClick={(e) => {
                            toggleNextComp(e);
                    }}>{choises[1]}</button>
                </div>
                <div className="choises">
                    {currentQuestion.type !== 'boolean' && 
                        <>
                            <button className="btn-choise" data-id = "2" 
                                style={{backgroundColor: btnColors.btn_2[0], color:btnColors.btn_2[1]}}  
                                disabled={btnDisabled} value={choises[2]} onClick={(e) => {
                                    toggleNextComp(e);
                                    }}>{choises[2]}</button>
                            <button className="btn-choise" data-id = "3" 
                                style={{backgroundColor: btnColors.btn_3[0], color:btnColors.btn_3[1]}} 
                                disabled={btnDisabled} value={choises[3]} onClick={(e) => {
                                    toggleNextComp(e);
                                    }}>{choises[3]}</button>
                        </>
                    }
                </div>
            </div>
            <div className="next-question">
                {toggleNext && <Next answeredCorrect={answeredCorrect} nextQuestion={nextQuestion}/>}
            </div>
        </main>
    );
}

export default Question