import { useState, useEffect } from "react";

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


export default ChoiceButton;