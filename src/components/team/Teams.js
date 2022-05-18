import React, { useEffect, useState } from "react"
import { getAllTeams, getAllScores } from "../ApiManager"
import "./Teams.css"

export const Teams = () => {
    const [teamList, setTeams] = useState([])
    const [week, updateWeek] = useState()

    useEffect(
        () => {
            // GET request using fetch to return array of NCAAF teams 
            getAllTeams()
                .then((data) => { setTeams(data.sports[0].leagues[0]) })
        },
        []
    )
    
    useEffect(
        () => {
            // GET request using fetch to return current scores
            // which includes current week, then updates week state to be used in addTeam function
            getAllScores()
                .then((data) => { updateWeek(data.week.number) })
        },
        []
    )

     
     // addTeam function creates a new team object for the week added 
     // saves the ESPN team id passed in as a param along with the user who added team
     // sends a POST request using a fetch call to save it to local db
     const addTeam = (id) => {
        const newTeam = {
            userId: parseInt(localStorage.getItem("ncaaf_user")),
            week: week,
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
            <h1 className="teamList">Team List:</h1>
           { 
              teamList?.teams?.filter(teamObject => teamObject.team.logos[1]?.href).map((teamObject) => {
                         return <p key={`team--${teamObject.team.id}`} className="teams">
                             <img src={teamObject.team.logos[1]?.href} className="teamsList" alt =""/> 
                             {teamObject.team.displayName} {teamObject.team.record?.items[0].summary}
                             <button onClick={() => 
                             {addTeam(teamObject.team.id)}} 
                             className="team-btn">Add Team</button>
                             </p>
                    }
                )
            }
            </section>
            </main>

         
           
        </>
    )
}

