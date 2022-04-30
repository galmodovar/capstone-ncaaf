import { useEffect, useState } from "react"
import { getAllScores } from "../ApiManager"
import "./News.css"

export const MainScores = () => {
    const [topScores, updateScores] = useState([])

    useEffect(
        () => {
            getAllScores()
                .then((data) => {
                    updateScores(data)
                })
        },
        []
    )
   
    return (
        <>
        <section className="scheduleContainer--main">
        <h3> Week {topScores.week?.number} Latest Scores:</h3>
        
            {
            topScores.events?.map(
                        (scoreObject) => {
                            return <p key={`score--${scoreObject.id}`} className="weekSchedule"> <img src={scoreObject?.competitions[0].competitors[0].team.logo} className="teamsList"/>   
                            {scoreObject?.competitions[0].competitors[0].team.name} <b>{scoreObject?.competitions[0].competitors[0].score}</b> 
                            <img src={scoreObject?.competitions[0].competitors[1].team.logo} className="teamsList"/>
                            {scoreObject?.competitions[0].competitors[1].team.name} <b>{scoreObject?.competitions[0].competitors[1].score}</b></p>
                            }
                        )
                    }
                </section>
        </>
    )
}