import Question from "./question";

const Next = ({answeredCorrect, nextQuestion}) => {{}
    return ( 
        <>
        <h2>{answeredCorrect? "Correct!": "Sorry!"}</h2>
        <button className="btn-next" onClick={() => nextQuestion(answeredCorrect)}>Next Question</button>
        </>
    );
}

export default Next;