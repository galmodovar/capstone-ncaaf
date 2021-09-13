import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/news">News</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/teams">Teams</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/sports">Scores</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/users">Users</Link>
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
