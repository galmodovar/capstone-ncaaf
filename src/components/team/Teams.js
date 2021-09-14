import React, { useEffect, useState } from "react"
import { getAllTeams } from "../ApiManager"

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

           { 
              teamList?.teams?.map(
                 (teamObject, index ) => {
                    return <p key={`headline--`}> {teamObject.team.name} </p>
                 }
             )
        }  
         
           
        </>
    )
}

