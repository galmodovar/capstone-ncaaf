import React, { useEffect, useState } from "react"
import { getAllScores } from "../ApiManager"

export const Scoreboard = () => {
    const [topScores, updateScores] = useState([])
    const [pastScores, updatePastScores] = useState([])
    const [week, setWeek] = useState(0)
    
    useEffect(
        () => {
            getAllScores()
                .then((data) => {
                    updateScores(data)
                })
        },
        []
    )
    useEffect( () => {
        fetch(`http://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?week=${week}`)
            .then(res => res.json())
            .then((data) => {
                updatePastScores(data)
            })
    }, [ week ])

    const weeks = topScores.week?.number

    return (
        <>
            <main className="mainContainer">
                <section className="scoreContainer">
                    <h3> Week {topScores.week?.number} Schedule:</h3>
                    {
                        topScores.events?.map(
                        (scoreObject) => {
                        return <p key={`score--${scoreObject.id}`}> {scoreObject.date}  {scoreObject.name} </p>
                        }
                        )
                    }
                </section>
                <section className="scoreContainer">
                    <h3> Past Scores:</h3>
                     <select className="week__dropdown" onChange={
                        (event) => {
                             setWeek(parseInt(event.target.value) + 1)
                             }}>
                                 <option>Choose a week:</option>
                                 {
                                 Array.from(Array(weeks).keys()).map(week => {
                                     return <option value={week++} key={`week--${week++}`}>Week:{week++}</option>
                                    })
                                }
                    </select>
                </section>
                <section className="scoreContainer">
                    {
                        pastScores?.events?.map(
                        (scoreObject) => {
                        return <p key={`score--${scoreObject.id}`}> {scoreObject.date}  
                        {scoreObject?.competitions[0].competitors[0].team.name} {scoreObject?.competitions[0].competitors[0].score} {scoreObject?.competitions[0].competitors[1].team.name} {scoreObject?.competitions[0].competitors[1].score}</p>
                        })
                    }
                </section> 
            </main>
        </>
    )
}