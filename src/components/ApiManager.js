


// Local calls
export const getAllUsers = () => {
    return fetch(`http://localhost:8088/users`)
        .then(res => res.json())
}

export const getMyTeams = () => {
    const userId = localStorage.getItem("ncaaf_user")
    return fetch(`http://localhost:8088/myTeams?userId=${userId}&_expand=user`)
        .then(res => res.json())
}

export const getAllLocalTeams = () => {
    return fetch(`http://localhost:8088/myTeams?_expand=user`)
        .then(res => res.json())
}





// External Calls

export const getAllNews = () => {
    return fetch(`http://site.api.espn.com/apis/site/v2/sports/football/college-football/news`)
        .then(res => res.json())
}

export const getAllTeams = () => {
    return fetch(`http://site.api.espn.com/apis/site/v2/sports/football/college-football/teams?limit=1000&groups=80`)
        .then(res => res.json())
}

export const getAllConferences = () => {
    return fetch(`https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard/conferences?groups=80`)
        .then(res => res.json())
}

export const getAllRankings = () => {
    return fetch(`http://site.api.espn.com/apis/site/v2/sports/football/college-football/rankings`)
        .then(res => res.json())
}

export const getAllScores = () => {
    return fetch(`http://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?groups=80&limit=100`)
        .then(res => res.json())
}

