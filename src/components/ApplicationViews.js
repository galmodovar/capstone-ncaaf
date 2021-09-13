import React from "react"
import { Route } from "react-router-dom"
import { MainFeed } from "./news/MainNews"
import { NewsFeed } from "./news/News"






export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <MainFeed />
            </Route>

            <Route exact path="/news">
                <NewsFeed />
            </Route>

            <Route exact path="/scores">
            </Route>

            <Route exact path="/users">
            </Route>
                    <Route exact path="/teams">
                    </Route>

 

          
        </>
    )
}