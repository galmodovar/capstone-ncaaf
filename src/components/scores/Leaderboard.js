import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMyTeams } from '../ApiManager'

export const LeaderBoard = () => {
    const [teamsList, setTeams] = useState([])
    const [teams, updateTeams] = useState("")
    const [myTeams, setMyTeams] = useState(new Map())
    const { userId }  = useParams()
    
     useEffect(
        () => {
            getMyTeams()
                .then((data) => {
                    setTeams(data)
                })
        },
        [ userId ]
    )

    // useEffect(() => {
    //     const allTeams = teamsList.filter(team => team.id !== 0).length
    //     updateTeams(allTeams)
    // }, [teamsList] )


    return (
        <>
            <h2>Leader Board</h2>

            {
                teamsList.map(
                    (team) => {
                        return <p key={`team--${team.id}`}> Week #{team.week} Team Score:{team.weeklyScore} </p>
                    }
                )
            }

            <h3>You have {teamsList.length} teams on your roster for the week.</h3>

            
        </>
    )
}