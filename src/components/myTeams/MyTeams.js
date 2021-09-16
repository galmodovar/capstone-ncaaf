import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMyTeams, getAllTeams, getAllScores } from '../ApiManager'

export const MyTeams = () => {
    const [myTeams, setTeams] = useState([])
    const [teamList, updateTeams] = useState()
    const [teamsArr, simplifyTeams] = useState()
    const [userTeams, setUserTeams] = useState([])
    const [teamScores, setTeamScores] = useState([])
    const [userTeamScores, setUserTeamScores] = useState([])
    const [pastUserTeamScores, setUserTeamPastScores] = useState([])
    const [pastScores, updatePastScores] = useState([])
    const [week, setWeek] = useState(0)
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
            getAllScores()
                .then((data) => {
                    setTeamScores(data)
                })
        },
        []
    )
    useEffect(
        () => {
           simplifyTeams(teamList?.sports[0].leagues[0])
   },
        [teamList]
    )
    useEffect(
        () => {
            getAllScores()
            .then(
                () => getMyTeams())
                .then(
                    (data) => {
                    const week = data.map(newData => {
                        if (newData.week === teamScores?.week?.number) {
                            setTeams(newData)
                        } else {
                            setTeams(data)
                        }
                    })
                })
        },
        [  ]
    )

    useEffect(() => {
        const allTeams = teamsArr?.teams?.filter((filterTeam) => !!myTeams.some(myTeam => parseInt(filterTeam.team.id) === myTeam.teamId))
        setUserTeams(allTeams)
    }, [myTeams] )

    useEffect(() => {
        const events = teamScores?.events?.map(event => event.competitions[0].competitors)
        const myTeamScores = events?.filter((game) => {
            for (const a of game ) {
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

        }, [myTeams] )
    
useEffect(() => {
        const events = pastScores?.events?.map(event => event.competitions[0].competitors)
        const myTeamScores = events?.filter((game) => {
            for (const a of game ) {
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

        }, [pastScores] )

useEffect( () => {
        fetch(`http://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?groups=80&week=${week}`)
            .then(res => res.json())
            .then((data) => {
                updatePastScores(data)
            })
    }, [ week ])

    const weeks = teamScores?.week?.number


    return (
        <>
            <section className="teamsGameWeek">
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
            </section>
            <section className="scoreContainer">
                    <h3> Past Scores:</h3>
                     <select className="week__dropdown" onChange={
                        (event) => {
                             setWeek(parseInt(event.target.value) + 1)
                             }}>
                                 <option>Choose a week:</option>
                                 {
                                 Array.from(Array(weeks).keys()).map(week => {
                                     return <option value={week++} key={`week--${week++}`}>Week:{week++}</option>
                                    })
                                }
                    </select>
                </section>
            <section className="teamsGameWeek">
            <h2>Team Scores</h2>
            {
                userTeamScores?.map(
                    (teamObject) => {
                        return <p key={`team--${teamObject.id}`}>  <img src={teamObject.team.logo} className="teamsList"/> {teamObject.team.displayName} {teamObject.score} </p>
                    }
                )
            }
            </section>
        </>
    )
}