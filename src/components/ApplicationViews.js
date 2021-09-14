import React from "react"
import { Route } from "react-router-dom"
import { MainFeed } from "./news/MainNews"
import { NewsFeed } from "./news/News"
import { Teams } from "./team/Teams"







export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <MainFeed />
            </Route>

            <Route exact path="/news">
                <NewsFeed />
            </Route>

            <Route exact path="/teams">
                <Teams />
            </Route>

            <Route exact path="/users">
            </Route>
                    <Route exact path="/myTeams">
                    </Route>

 

          
        </>
    )
}