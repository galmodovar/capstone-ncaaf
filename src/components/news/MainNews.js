import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getAllNews, getAllRankings } from "../ApiManager"
import "./News.css"

export const MainNews = () => {
    const [headlines, updateHeadlines] = useState([])
    const [rankings, updateRankings] = useState([])

    useEffect(
        () => {
            // function that makes a GET request using fetch call to return ESPN's college football headlines
            getAllNews()
                .then((data) => { updateHeadlines(data) })
        },
        []
    )
    useEffect(
        () => {
            // function that makes a GET request using fetch call to return current weeks AP poll rankings
            getAllRankings()
                .then((data) => {
                    let currentRankings = data?.rankings[0].ranks
                    updateRankings(currentRankings)
                })
        },
        []
    )
    
    return (
        <>
        <section className="newsContainer">
            <h1>Latest Headlines:</h1>
            {headlines.articles?.map((headlineObject, i) => {
                return <p key={`headline--${i}`}> {headlineObject.headline}
                <Link className="main-headline"
                    to={{pathname: `${headlineObject.links.web.href}`,}} target="_blank">
                    
                    <span>Read more</span>
                </Link>
                    </p>
                })}
            
            <h1>Latest AP Rankings:</h1>
                <div className="rankings">
                    {rankings?.map((rankingObject, i) => {
                        return <p key={`ranking--${i}`} className="teamRankings"> #{rankingObject.current} <img src={rankingObject.team.logo} className="teamsList" alt =""/> {rankingObject.team.nickname} {rankingObject.recordSummary} </p>
                        })}
                </div>
        </section>            
        </>
        )
    }