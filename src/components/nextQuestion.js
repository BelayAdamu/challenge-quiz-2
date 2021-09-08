const Next = ({ answeredCorrect, handleClick }) => {
  return (
    <>
      <h2>{answeredCorrect ? "Correct!" : "Sorry!"}</h2>
      <button
        className="btn-next"
        onClick={() => {
          handleClick(answeredCorrect);
        }}
      >
        Next Question
      </button>
    </>
  );
};

export default Next;
