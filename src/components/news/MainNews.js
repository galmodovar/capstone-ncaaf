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
                    <h3> Latest Headlines:</h3>
                    {
                        headlines.articles?.map(
                        (headlineObject, i) => {
                        return <p key={`headline--${i}`}> {headlineObject.headline} 
                        <Link className="main-headline"
                        to={{pathname: `${headlineObject.links.web.href}`,}} target="_blank">
                        <span>Read more</span>
                        </Link> </p>
                        }
                        )
                    }
                    <h3> Latest AP Poll Rankings:</h3>
                    <div className="rankings">
                    {
                        rankings?.map(
                        (rankingObject, i) => {
                        return <p key={`ranking--${i}`} className="teamRankings"> #{rankingObject.current} <img src={rankingObject.team.logo} className="teamsList"/> {rankingObject.team.nickname} {rankingObject.recordSummary} </p>
                        }
                        )
                    }
                    </div>
                </section>            
        </>
    )
}