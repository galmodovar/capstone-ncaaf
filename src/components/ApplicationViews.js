import React from "react"
import { Route } from "react-router-dom"
import { MyTeams } from "./myTeams/MyTeams"
import { MainFeed } from "./news/MainNews"
import { LeaderBoard } from "./scores/Leaderboard"
import { Scoreboard } from "./scores/Scoreboard"
import { Teams } from "./team/Teams"







export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <MainFeed />
            </Route>

            <Route exact path="/scores">
                <Scoreboard />
            </Route>

            <Route exact path="/teams">
                <Teams />
            </Route>

            <Route exact path="/weeklyChallenge">
                <LeaderBoard />
            </Route>

            <Route exact path="/myTeams/:userId">
                <MyTeams />
            </Route>
            <Route exact path="/">
            </Route>




        </>
    )
}