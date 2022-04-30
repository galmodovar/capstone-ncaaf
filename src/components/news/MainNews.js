import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllNews, getAllRankings } from "../ApiManager"
import { MainScores } from "./MainScores"
import "./News.css"

export const MainFeed = () => {
    const [headlines, updateHeadlines] = useState([])
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
            <main className="main">
                <MainScores />
                
                <section className="newsContainer">
                    <h3> Latest Headlines:</h3>
                    {
                        headlines.articles?.map(
                        (headlineObject) => {
                        return <p key={`headline--`}> {headlineObject.headline} <Link className="main-headline"
                        to={{
                            pathname: `${headlineObject.links.web.href}`,
                        }} target="_blank">
                        <span>Read more</span>
                    </Link> </p>
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