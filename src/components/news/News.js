import React, { useEffect, useState } from "react"
import { getAllNews } from "../ApiManager"

export const NewsFeed = () => {
    const [headlines, updateHeadlines] = useState([])
    //const [totalCustomerMessage, updateMessage] = useState("")

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
            <h3> Latest Headlines:</h3>
            {
                headlines.articles?.map(
                    (headlineObject) => {
                        return <p key={`headline--`}> {headlineObject.headline} </p>
                    }
                )
            }
        </>
    )
}