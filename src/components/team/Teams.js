import React, { useEffect, useState } from "react"
import { getAllTeams, getAllScores } from "../ApiManager"
import "./Teams.css"

export const Teams = () => {
    const [allTeams, updateTeams] = useState()
    const [teamList, setTeams] = useState([])
    const [week, updateScores] = useState()

    useEffect(
        () => {
            getAllTeams()
                .then((data) => {
                    updateTeams(data)
                })
        },
        []
    )

    useEffect(
        () => {
            getAllScores()
                .then((data) => {
                    updateScores(data.week)
                })
        },
        []
    )

     useEffect(
         () => {
            setTeams(allTeams?.sports[0].leagues[0])
    },
         [allTeams]
     )

     const addTeam = (id) => {
        const newTeam = {
            userId: parseInt(localStorage.getItem("ncaaf_user")),
            week: week.number,
            teamId: parseInt(id),
        
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTeam)
        }
        return fetch(`http://localhost:8088/myTeams`, fetchOption)
       
    }
        



    return (
        <>
            <main className="mainContainer">
            <section className="teamContainer">
            <h3 className="teamList"> Team List:</h3>
           { 
              teamList?.teams?.map(
                 (teamObject ) => {
                     
                    return <p key={`team--${teamObject.team.id}`} className="teams">  <img src={teamObject.team.logos[1].href} className="teamsList"/> {teamObject.team.displayName} {teamObject.team.record?.items[0].summary} 
                             <button onClick={() => {addTeam(teamObject.team.id)}} className="team-btn">Add Team</button> </p>
                    }
                )
            }
            </section>
            </main>

         
           
        </>
    )
}

