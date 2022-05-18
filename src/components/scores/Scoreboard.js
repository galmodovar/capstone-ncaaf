import React, { useEffect, useState } from "react"
import { getAllScores } from "../ApiManager"
import "./Scoreboard.css"

export const Scoreboard = () => {
    const [topScores, updateScores] = useState([])
    const [pastScores, updatePastScores] = useState([])
    const [week, setWeek] = useState(0)
    
    useEffect(
        () => {
            // function that makes a GET request using fetch call to return current weeks scoreboard
            getAllScores()
                .then((data) => {
                    updateScores(data)
                })
        },
        []
    )
    useEffect( () => {
        // simple GET request using fetch call that will return scoreboard for week selected from dropdown
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
                <section className="scheduleContainer">
                <h1> Week {topScores.week?.number} Schedule:</h1>
                    {
                        topScores.events?.map(
                        (scoreObject) => {
                        return <p key={`score--${scoreObject.id}`} className="weekSchedule"> 
                        <img src={scoreObject?.competitions[0].competitors[0].team.logo} alt ="" className="teamsList" /> {scoreObject?.competitions[0].competitors[0].team.location} <img src={scoreObject?.competitions[0].competitors[1].team.logo} className="teamsList" alt =""/> {scoreObject?.competitions[0].competitors[1].team.location} </p>
                        }
                        )
                    }
                </section>
                <section className="pastScoreContainer">
                <section className="scoreContainer">
                    <h1> Past Scores:

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
                    </h1>
                </section>
                    {
                        pastScores?.events?.map(
                        (scoreObject) => {
                        return <p key={`score--${scoreObject.id}`} className="weekSchedule"> <img src={scoreObject?.competitions[0].competitors[0].team.logo} className="teamsList" alt =""/>   
                        {scoreObject?.competitions[0].competitors[0].team.name} <b>{scoreObject?.competitions[0].competitors[0].score}</b> 
                        <img src={scoreObject?.competitions[0].competitors[1].team.logo} className="teamsList" alt=""/>
                        {scoreObject?.competitions[0].competitors[1].team.name} <b>{scoreObject?.competitions[0].competitors[1].score}</b></p>
                        })
                    }
                </section> 
            </main>
        </>
    )
}