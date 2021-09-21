import React, { useEffect, useState } from "react"
import { getAllNews } from "../ApiManager"
import "./News.css"

export const NewsFeed = () => {
    const [headlines, updateHeadlines] = useState([])
   

    useEffect(
        () => {
            getAllNews()
                .then((data) => {
                    updateHeadlines(data)
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
                    (headlineObject) => {
                        return <p key={`headline--`} className="headline"> {headlineObject.headline} </p>
                    }
                )
            }
            </section>
        </>
    )
}