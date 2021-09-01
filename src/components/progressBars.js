
const ProgressBars = () => {
    return (
         <>
            <div className="question-progress">
                <div className="qtn-pg-bar" style={{width: `80%`}} ></div>
            </div>
            
            
            <div className="scores-wrapper">
                <div className="txt-scores-wrapper">
                    <div className="txt-actual-score">
                        <p>Score {`67`}%</p>
                    </div>
                    <div className="txt-max-score">
                        <p>Max Score {`75`}%</p>
                    </div>
                </div>
                <div className="scores-bar">
                    <div className="lowest-possible-score" style={{width: `50%`}}></div>
                    <div className="actual-score" style={{width: `60%`}}></div>
                    <div className="highest-possible-score" style={{width: `70%`}}></div>
                </div>
            </div>
         </>       
    );
}

export default ProgressBars;