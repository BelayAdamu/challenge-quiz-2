const ScoreBars = ({ correctAnswers, wrongAnswers, numOfQtns, qtnNum }) => {
  return (
    <>
      <div className="scores-wrapper">
        <div className="txt-scores-wrapper">
          <div className="txt-actual-score">
            <p>
              Score{" "}
              {qtnNum === 1
                ? Math.floor((correctAnswers * 100) / 1)
                : Math.floor((correctAnswers * 100) / (wrongAnswers + correctAnswers))}
              %
            </p>
          </div>
          <div className="txt-max-score">
            <p>
              Max Score{" "}
              {Math.floor(((numOfQtns - wrongAnswers) * 100) / numOfQtns)}%
            </p>
          </div>
        </div>
        <div className="scores-bar">
          <div
            className="lowest-possible-score"
            style={{
              width: `${Math.floor(
                (correctAnswers * 100) / numOfQtns
              ).toString()}%`,
            }}
          ></div>
          <div
            className="actual-score"
            style={{
              width: `${
                qtnNum > wrongAnswers + correctAnswers
                  ? Math.floor((correctAnswers * 100) / (qtnNum - 1)).toString()
                  : Math.floor((correctAnswers * 100) / qtnNum).toString()
              }%`,
            }}
          ></div>
          <div
            className="highest-possible-score"
            style={{
              width: `${Math.floor(
                ((numOfQtns - wrongAnswers) * 100) / numOfQtns
              ).toString()}%`,
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default ScoreBars;
