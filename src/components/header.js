const Header  = ({numOfQtns, qtnNum, qtnCategory, qtnDifficulty}) => {
    return (
        <header>
            <div className="header-wrapper">
                <h1>Question {qtnNum} of {numOfQtns}</h1>
                <p>{decodeURIComponent(qtnCategory)}</p>
                <span className="fa fa-star"></span>&nbsp;
                <span className={`fa fa-star${qtnDifficulty === "easy"? "-o": ""}`}></span>&nbsp;
                <span className={`fa fa-star${qtnDifficulty === "hard"? "": "-o"}`}></span>
            </div>
        </header>
    )
}

export default Header;