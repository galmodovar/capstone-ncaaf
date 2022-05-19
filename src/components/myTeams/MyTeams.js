import React, { useEffect, useState } from 'react'
import { getMyTeams, getAllTeams, getAllScores } from '../ApiManager'
import "./myTeams.css"

export const MyTeams = () => {
    const [teamList, updateTeams] = useState()
    const [myTeams, setTeams] = useState([])
    const [userTeams, setUserTeams] = useState([])
    const [userTeamScores, setUserTeamScores] = useState([])
    const [pastScores, updatePastScores] = useState([])
    const [week, setWeek] = useState()

    useEffect(
        () => {
            getAllTeams()
                .then((data) => { updateTeams(data.sports[0].leagues[0]) })
        },
        []
    )
    useEffect(
        () => {
            getAllScores()
                .then((data) => { setWeek(data.week.number) })
        },
        []
    )

    useEffect(
        () => {
            // GET request using fetch to return user specific teams from local db and filter those from current week only 
           getMyTeams()
                .then((data) => {
                        const currentWeekTeams = data.filter(newData => newData.week === week) 
                        setTeams(currentWeekTeams)
                    })
        },
        [week]
    )

    useEffect(() => {
        // filtering ESPN's list of teams using local db user teams by matching id
        const allTeams = teamList?.teams?.filter((filterTeam) => !!myTeams.some(myTeam => parseInt(filterTeam.team.id) === myTeam.teamId))
        setUserTeams(allTeams)
    }, [myTeams, teamList])

    useEffect(() => {
        const events = pastScores?.events?.map(event => event.competitions[0].competitors)
        const myTeamScores = events?.filter((games) => {
            // filtering through list of games searching for a match of local team db id and espn team id
            // if there's a match return game which includes an array of 2 teams including matching team
            for (const game of games) {
                for (const myTeam of myTeams) {
                    if (parseInt(game.team.id) === myTeam.teamId) {
                        return game
                    }
                }

            }
        })
        // flatten the array and return teams with an attribute of score for the current week
        const scores = myTeamScores?.flat()
        // filtering array using local db team id
        const userScores = scores?.filter((filterTeam => !!myTeams.some(myTeam => parseInt(filterTeam.id) === myTeam.teamId)))
        setUserTeamScores(userScores)

    }, [myTeams, week, pastScores])

    useEffect(() => {
        fetch(`http://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?groups=80&week=${week ? week : 1}&limit=100`)
            .then(res => res.json())
            .then((data) => {updatePastScores(data)})
    }, [week])

    const removeTeam = (id) => {
        fetch(`http://localhost:8088/myTeams/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                const userId = localStorage.getItem("ncaaf_user")
                fetch(`http://localhost:8088/myTeams?userId=${userId}&_expand=user`)
                    .then(res => res.json())
                    .then((data) => {
                        const currentWeek = data.filter(newData => newData.week === week)
                        setTeams(currentWeek)
                    })
            }
            )
    }

    return (
        <>
            <main className="mainContainer">
            <section className="scoreContainer">
                    <select className="week__dropdown" onChange={
                        (event) => {
                            setWeek(parseInt(event.target.value) + 1)
                        }}>
                        <option value={0}>Choose a week:</option>
                        {
                            Array.from(Array(week).keys()).map(w => {
                                return <option value={w++} key={`week--${w++}`}>Week:{w++}</option>
                            })
                        }
                    </select>
                </section>
                <section className="teamsGameWeek">
                    <h1>My Teams</h1>
                    {
                        userTeams?.map(
                            (teamObject) => {

                                return <p key={`team--${teamObject.team.id}`} className="myTeams">
                                    <img src={teamObject.team.logos[1].href} className="teamsList" alt="" />
                                    {teamObject.team.displayName} {teamObject.team.record?.items[0].summary}
                                    <button onClick={() => {
                                        const team = myTeams.find(team => (team.teamId === parseInt(teamObject.team.id)))
                                        removeTeam(team.id)
                                    }} className="team-btn">Remove Team</button>
                                    </p>
                            }
                        )
                    }
                    <h3>You have {myTeams.length} teams on your roster for the week.</h3>
                </section>
                <section className="teamsGameScore">
                    <h1>Team Scores</h1>
                    {
                        userTeamScores?.map(
                            (teamObject) => {
                                return <p key={`team--${teamObject.id}`} className="teams">
                                    <img src={teamObject.team.logo} className="teamsList" alt ="" />
                                    {teamObject.team.displayName} {teamObject.score}
                                    </p>
                            }
                        )
                    }
                </section>
            </main>
        </>
    )
}