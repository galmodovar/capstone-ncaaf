import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getAllNews, getAllRankings } from "../ApiManager"
import "./News.css"

export const MainNews = () => {
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
        <section className="newsContainer">
            <h1> Latest Headlines:</h1>
            {headlines.articles?.map((headlineObject, i) => {
                return <p key={`headline--${i}`}> {headlineObject.headline}
                <Link className="main-headline"
                    to={{pathname: `${headlineObject.links.web.href}`,}} target="_blank">
                    
                    <span>Read more</span>
                </Link>
                    </p>
                })}
            
            <h1> Latest AP Poll Rankings:</h1>
                <div className="rankings">
                    {rankings?.map((rankingObject, i) => {
                        return <p key={`ranking--${i}`} className="teamRankings"> #{rankingObject.current} <img src={rankingObject.team.logo} className="teamsList" alt =""/> {rankingObject.team.nickname} {rankingObject.recordSummary} </p>
                        })}
                </div>
        </section>            
        </>
        )
    }