import React, { useEffect, useState } from "react"
import { getAllTeams } from "../ApiManager"
import "./Teams.css"

export const Teams = () => {
    const [allTeams, updateTeams] = useState()
    const [teamList, setTeams] = useState([])
    //const [totalCustomerMessage, updateMessage] = useState("")

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
            setTeams(allTeams?.sports[0].leagues[0])

            
        
    },
         [allTeams]
     )

    //const teamList = allTeams?.sports[0].leagues
        



    return (
        <>
            <h3> Team List:</h3>

            <section className="teamContainer">
           { 
              teamList?.teams?.map(
                 (teamObject ) => {
                     
                    return <p key={`team--${teamObject.id}`}>  <img src={teamObject.team.logos[1].href} className="teamsList"/> {teamObject.team.displayName} {teamObject.team.record?.items[0].summary} 
                             <button onClick={() => {}} className="team-btn">Add Team</button> </p>
                    }
                )
            }
            </section>  
         
           
        </>
    )
}

