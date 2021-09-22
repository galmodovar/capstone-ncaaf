import React, { useEffect, useState } from "react"
import { getAllNews, getAllRankings, getAllScores } from "../ApiManager"
import "./News.css"

export const MainFeed = () => {
    const [headlines, updateHeadlines] = useState([])
    const [topScores, updateScores] = useState([])
    const [rankings, updateRankings] = useState([])

    useEffect(
        () => {
            getAllNews()
                .then((data) => {
                    updateHeadlines(data)
                })
        },
        []
    )

    useEffect(
        () => {
            getAllScores()
                .then((data) => {
                    updateScores(data)
                })
        },
        []
    )

    useEffect(
        () => {
            getAllRankings()
                .then((data) => {
                    let currentRank = data?.rankings[0].ranks
                    updateRankings(currentRank)
                })
        },
        []
    )


    return (
        <>
            <h3> Week {topScores.week?.number} Latest Scores:</h3>
            <main className="main">
                <section className="scheduleContainer--main">
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
                <section className="newsContainer">
                    <h3> Latest Headlines:</h3>
                    {
                        headlines.articles?.map(
                        (headlineObject) => {
                        return <p key={`headline--`}> {headlineObject.headline} </p>
                        }
                        )
                    }
                    <h3> Latest AP Poll Rankings:</h3>
                    <div className="rankings">
                    {
                        rankings?.map(
                        (rankingObject) => {
                        return <p key={`ranking--`} className="teamRankings"> #{rankingObject.current} <img src={rankingObject.team.logo} className="teamsList"/> {rankingObject.team.nickname} {rankingObject.recordSummary} </p>
                        }
                        )
                    }
                    </div>
                </section>
            </main>
            
        </>
    )
}