import { useEffect, useState } from "react"
import { getAllScores } from "../ApiManager"
import "./News.css"

export const MainScores = () => {
    const [topScores, updateScores] = useState([])

    useEffect(
        () => {
            // function that makes a GET request using fetch call to return current weeks scoreboard
            getAllScores()
                .then((data) => { updateScores(data) })
        },
        []
    )
   
    return (
        <>
        <section className="scheduleContainer--main">
        <h1 className="currentWeek"> Week {topScores.week?.number} Latest Scores:</h1>
        <ul className="teamScores">
            {
            topScores.events?.map(
                        (scoreObject) => {
                            return <>
                            <li key={`score--${scoreObject.id}`} className="weekSchedule"> 
                            <p className="teamNames"><img src={scoreObject?.competitions[0].competitors[0].team.logo} className="teamsList" alt=""/>   
                            {scoreObject?.competitions[0].competitors[0].team.name} <b> {scoreObject?.competitions[0].competitors[0].score}</b></p>
                            <p className="teamNames"><img src={scoreObject?.competitions[0].competitors[1].team.logo} className="teamsList" alt =""/>
                            {scoreObject?.competitions[0].competitors[1].team.name} <b> {scoreObject?.competitions[0].competitors[1].score}</b></p>
                            </li>
                        </>    
                        }
                        )
                    }

        </ul>

                </section>
        </>
    )
}