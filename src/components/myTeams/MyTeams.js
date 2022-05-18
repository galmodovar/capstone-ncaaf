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
            getAllScores()
                .then(
                    () => getMyTeams())
                .then(
                    (data) => {
                        const currentWeek = data.filter(newData => newData.week === week) 
                        setTeams(currentWeek)
                    })
        },
        [week]
    )

    useEffect(() => {
        const allTeams = teamList?.teams?.filter((filterTeam) => !!myTeams.some(myTeam => parseInt(filterTeam.team.id) === myTeam.teamId))
        setUserTeams(allTeams)
    }, [myTeams])

    useEffect(() => {
        const events = pastScores?.events?.map(event => event.competitions[0].competitors)
        const myTeamScores = events?.filter((game) => {
            for (const a of game) {
                for (const myTeam of myTeams) {
                    if (parseInt(a.team.id) === myTeam.teamId) {
                        return a
                    }
                }

            }
        })
        const scores = myTeamScores?.flat()
        const userScores = scores?.filter((filterTeam => !!myTeams.some(myTeam => parseInt(filterTeam.id) === myTeam.teamId)))
        setUserTeamScores(userScores)

    }, [myTeams, week])

    useEffect(() => {
        const events = pastScores?.events?.map(event => event.competitions[0].competitors)
        const myTeamScores = events?.filter((game) => {
            for (const a of game) {
                for (const myTeam of myTeams) {
                    if (parseInt(a.team.id) === myTeam.teamId) {
                        return a
                    }
                }

            }
        })
        const scores = myTeamScores?.flat()
        const userScores = scores?.filter((filterTeam => !!myTeams.some(myTeam => parseInt(filterTeam.id) === myTeam.teamId)))
        setUserTeamScores(userScores)

    }, [pastScores])


    const removeTeam = (id) => {
        fetch(`http://localhost:8088/myTeams/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                const userId = localStorage.getItem("ncaaf_user")
                fetch(`http://localhost:8088/myTeams?userId=${userId}&_expand=user`)
                    .then(res => res.json())
                    .then((data) => {
                        const currentWeek = data.filter(newData => {
                            if (newData.week === week) {
                                return newData
                            }
                        })
                        setTeams(currentWeek)
                    })
            }
            )
    }

    useEffect(() => {
        fetch(`http://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?groups=80&week=${week ? week : 1}&limit=100`)
            .then(res => res.json())
            .then((data) => {updatePastScores(data)})
    }, [week])

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
                                        const team = myTeams.find(team => {
                                            if (team.teamId === parseInt(teamObject.team.id)) {
                                                return team.id
                                            }
                                        })
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