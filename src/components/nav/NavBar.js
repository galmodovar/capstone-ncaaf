import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const currentUser = localStorage.getItem("ncaaf_user")
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/news">News</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/teams">Teams</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/scores">Scores</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/weeklyChallenge">Weekly Challenge</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to={`/myTeams/${currentUser}`}>My Teams</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="" onClick={
                    () => {
                        localStorage.removeItem("ncaaf_user")
                    }
                }>Logout</Link>
            </li>
        </ul>
    )
}
