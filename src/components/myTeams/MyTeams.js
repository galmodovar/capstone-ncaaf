import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMyTeams, getAllTeams } from '../ApiManager'

export const MyTeams = () => {
    const [myTeams, setTeams] = useState([])
    const [teamList, updateTeams] = useState()
    const [teamsArr, simplifyTeams] = useState()
    const [userTeams, setUserTeams] = useState([])
    const { userId }  = useParams()

    useEffect(
        () => {
            getAllTeams()
                .then((data) => {
                    updateTeams(data)
                })
        },
        [userId]
    )

    useEffect(
        () => {
           simplifyTeams(teamList?.sports[0].leagues[0])
   },
        [teamList]
    )

    
     useEffect(
        () => {
            getMyTeams()
                .then((data) => {
                    setTeams(data)
                })
        },
        [ userId ]
    )

    useEffect(() => {
        const allTeams = teamsArr?.teams?.filter((filterTeam) => !!myTeams.some(myTeam => parseInt(filterTeam.team.id) === myTeam.teamId))
        setUserTeams(allTeams)
    }, [myTeams] )


    return (
        <>
            <h2>My Teams</h2>

            {
                userTeams?.map(
                    (teamObject) => {
                        return <p key={`team--${teamObject.team.id}`}>  <img src={teamObject.team.logos[1].href} className="teamsList"/> {teamObject.team.displayName} {teamObject.team.record?.items[0].summary} 
                        <button onClick={() => {}} className="team-btn">Remove Team</button> </p>
                    }
                )
            }

            <h3>You have {myTeams.length} teams on your roster for the week.</h3>

            
        </>
    )
}