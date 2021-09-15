import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMyTeams, getAllUsers, getAllLocalTeams } from '../ApiManager'

export const LeaderBoard = () => {
    const [teamsList, setTeams] = useState([])
    const [localTeamsList, setLocalTeams] = useState([])
    const [users, setUsers] = useState([])
    const [currentUser, setUser] = useState()
    const [teams, updateTeams] = useState("")
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
            getAllUsers()
                .then((data) => {
                    setUsers(data)
                })
        },
        []
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
            setUser(users?.find(user => user.id === parseInt(userId)))
        },
        [users]
    )

    // useEffect(() => {
    //     const allTeams = teamsArr?.teams?.filter((filterTeam) => !!myTeams.some(myTeam => parseInt(filterTeam.team.id) === myTeam.teamId))
    //     setUserTeams(allTeams)
    // }, [myTeams] )

    return (
        <>
            <section className="myTeamContainer">
            <h2>{currentUser?.name}'s Score</h2>
            {
                teamsList.map(
                    (team) => {
                        return <p key={`team--${team.id}`}> Week #{team.week} Team Score:{team.weeklyScore} </p>
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

            
        </>
    )
}