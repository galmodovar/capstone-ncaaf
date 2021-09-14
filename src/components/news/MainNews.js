import React, { useEffect, useState } from "react"
import { getAllNews, getAllScores } from "../ApiManager"

export const MainFeed = () => {
    const [headlines, updateHeadlines] = useState([])
    const [topScores, updateScores] = useState([])

    // useEffect(
    //     () => {
    //         getAllNews()
    //             .then((data) => {
    //                 updateHeadlines(data)
    //             })
    //     },
    //     []
    // )

    // useEffect(
    //     () => {
    //         getAllScores()
    //             .then((data) => {
    //                 updateScores(data)
    //             })
    //     },
    //     []
    // )


    return (
        <>
            <main className="mainContainer">
                <section className="newsContainer">
                    <h3> Latest Headlines:</h3>
                    {
                        headlines.articles?.map(
                        (headlineObject) => {
                        return <p key={`headline--`}> {headlineObject.headline} </p>
                        }
                        )
                    }
                </section>
                
                <section className="scoreContainer">
                    <h3> Week {topScores.week?.number} Latest Scores:</h3>
                    {
                        topScores.events?.map(
                        (scoreObject) => {
                        return <p key={`score--`}> {scoreObject.date}  {scoreObject.name} </p>
                        }
                        )
                    }
                </section>
            </main>
            
        </>
    )
}