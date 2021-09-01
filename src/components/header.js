const Header  = () => {
    return (
        <header>
            <div className="header-wrapper">
                <h1>Question {0} of {20}</h1>
                <p>Entertainment: Board Games</p>
                <span className={`fa fa-star${"-o"}`}></span>&nbsp;
                <span className={`fa fa-star${"-o"}`}></span>&nbsp;
                <span className={`fa fa-star${"-o"}`}></span>
            </div>
        </header>
    )
}

export default Header;