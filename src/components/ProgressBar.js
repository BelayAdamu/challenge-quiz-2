
const ProgressBar = ({qtnNum, numOfQtns}) => {
  return (
    <div className="question-progress">
      <div
        className="qtn-pg-bar"
        style={{
          width: `${Math.min(100, Math.floor((qtnNum * 100) / numOfQtns))}%`,
        }}
      ></div>
    </div>
  )
}

export default ProgressBar;
