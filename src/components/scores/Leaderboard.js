import React, { useEffect, useState } from 'react'
import { getMyTeams, getAllLocalTeams, getAllScores } from '../ApiManager'

export const LeaderBoard = () => {
    const [teamsList, setTeams] = useState([])
    const [localTeamsList, setLocalTeams] = useState([])
    const [currentUser, setUser] = useState()
    const [teamScores, setTeamScores] = useState([])
    const [userTeamScores, setUserTeamScores] = useState([])
    const [myTeams, setMyTeams] = useState(new Map())
    const userId = localStorage.getItem("ncaaf_user")
    
     useEffect(
        () => {
            getMyTeams()
                .then((data) => {
                    setTeams(data)
                })
        },
        [ userId ]
    )
    useEffect(
        () => {
            getAllLocalTeams()
                .then((data) => {
                    setLocalTeams(data)
                })
        },
        []
    )
    useEffect(
        () => {
            localTeamsList?.find(user => {
                if (user.id === parseInt(userId)) {
                    setUser(user)
                }
            })
            },
        [localTeamsList]
    )
    useEffect(
        () => {
            getAllScores()
                .then((data) => {
                    setTeamScores(data)
                })
        },
        []
    )
    useEffect(() => {
        const events = teamScores?.events?.map(event => event.competitions[0].competitors)
        const myTeamScores = events?.filter((game) => {
            for (const a of game ) {
                for (const myTeam of teamsList) {
                    if (parseInt(a.team.id) === myTeam.teamId) {
                        return a
                      }  
                    } 
                    
                }
            })
            const scores = myTeamScores?.flat()
            const userScores = scores?.filter((filterTeam => !!teamsList.some(myTeam => parseInt(filterTeam.id) === myTeam.teamId)))
            setUserTeamScores(userScores)
    
            }, [teamScores] )


    // useEffect(() => {
    //     const allTeams = teamsArr?.teams?.filter((filterTeam) => !!myTeams.some(myTeam => parseInt(filterTeam.team.id) === myTeam.teamId))
    //     setUserTeams(allTeams)
    // }, [myTeams] )

    return (
        <>
        <main className="mainContainer">
            <section className="myTeamContainer">
            <h2>{currentUser?.user.name}'s Score</h2>
            {
                userTeamScores?.map(
                    (teamObject) => {
                        return <p key={`team--${teamObject.team.id}`}>  <img src={teamObject.team.logo} className="teamsList"/> {teamObject.team.displayName} {teamObject.score}</p>
                    }
                )
            }
            <h3>You have {teamsList.length} teams on your roster for the week.</h3>
            </section>
            <section className="myTeamContainer">
            <h2>Current Scores</h2>
            {
                localTeamsList.map(
                    (team) => {
                        return <p key={`team--${team.id}`}> Week #{team.week}: User Name: {team.user.name} Team Score:{team.weeklyScore} </p>
                    }
                )
            }
            <h3>You have {teamsList.length} teams on your roster for the week.</h3>
            </section>
            <section className="myTeamContainer">
            <h2>LeaderBoard</h2>
            {
                localTeamsList.map(
                    (team) => {
                        return <p key={`team--${team.id}`}> Week #{team.week}: User Name: {team.user.name} Team Score:{team.weeklyScore} </p>
                    }
                )
            }
            <h3>You have {teamsList.length} teams on your roster for the week.</h3>
            </section>
        </main>

            
        </>
    )
}