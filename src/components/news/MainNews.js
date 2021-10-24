import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
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
                        return <p key={`score--${scoreObject.id}`} className="weekSched"> 
                    <tr className="weekSchedule">
                           <td> <img src={scoreObject?.competitions[0].competitors[0].team.logo} className="teamsList"/> </td>  
                            <td>{scoreObject?.competitions[0].competitors[0].team.name}</td><td> <b>{scoreObject?.competitions[0].competitors[0].score}</b> </td>
                            <td> <img src={scoreObject?.competitions[0].competitors[1].team.logo} className="teamsList"/></td>
                            <td>{scoreObject?.competitions[0].competitors[1].team.name}</td><td> <b>{scoreObject?.competitions[0].competitors[1].score}</b></td>

                    </tr></p>
                            }
                        )
                    }
                </section>
                <section className="newsContainer">
                    <h3> Latest Headlines:</h3>
                    {
                        headlines.articles?.map(
                        (headlineObject) => {
                        return <p key={`headline--`}> {headlineObject.headline} 
                        <Link className="main-headline" to={{
                            pathname: `${headlineObject.links.web.href}`,
                        }} target="_blank">
                        <span>Read more</span>
                        </Link> </p>
                        })
                    }
                    <h3> Latest AP Poll Rankings:</h3>
                    <tr className="rankings">
                    {
                        rankings?.map(
                        (rankingObject) => {
                        return <p key={`ranking--`} className="teamRankings">
                             <td>#{rankingObject.current}</td> 
                             <td><img src={rankingObject.team.logo} className="teamsList"/> </td><td> {rankingObject.team.nickname}</td><td> {rankingObject.recordSummary}</td>
                    </p> 
                        })
                    }
                    </tr> 
                </section>
            </main>
            
        </>
    )
}