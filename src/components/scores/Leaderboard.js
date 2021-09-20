import React, { useEffect, useState } from "react";
import { getMyTeams, getAllLocalTeams, getAllScores } from "../ApiManager";
import "./Leaderboard.css";

export const LeaderBoard = () => {
  const [teamsList, setTeams] = useState([]);
  const [localTeamsList, setLocalTeams] = useState([]);
  const [currentUser, setUser] = useState();
  const [teamScores, setTeamScores] = useState([]);
  const [userTeamScores, setUserTeamScores] = useState([]);
  const [localTeamScores, setLocalTeamScores] = useState([]);
  const [localTeamArr, setUserTeams] = useState([]);
  const [userGroups, setUserGroups] = useState();
  const [totals, setTotal] = useState([]);
  const [total, setTotals] = useState(0);
  const [totalsArr, setTotalScoresArr] = useState();
  const [week, setWeek] = useState()
  const [weeks, setWeeks] = useState()
  const [pastScores, updatePastScores] = useState([])
  // const [groupTeams, setGroupTeams] = useState({})
  // const [chosenTeams, updateTeams] = useState({})
  const userId = localStorage.getItem("ncaaf_user");

  useEffect(() => {
    getMyTeams()
      .then(
        (data) => {
          const currentWeek = data.filter(newData => {
            if (newData.week === week) {
              return newData
            }
          })
          setTeams(currentWeek)
        })
  },
    [teamScores, week]
  )
  useEffect(() => {
    getAllLocalTeams().then((data) => {
      const currentWeek = data.filter(newData => {
        if (newData.week === week) {
          return newData
        }
      })
      setLocalTeams(currentWeek);
    });
  }, [week]);
  useEffect(() => {
    localTeamsList?.find((user) => {
      if (user.userId === parseInt(userId)) {
        setUser(user);
      }
    });
  }, [localTeamsList]);
  useEffect(() => {
    getAllScores().then(
      (data) => {
        setWeek(data.week.number);
        setWeeks(data.week.number);
      });
  }, []);
  useEffect(() => {
    const events = pastScores?.events?.map(
      (event) => event.competitions[0].competitors
    );
    const myTeamScores = events?.filter((game) => {
      for (const a of game) {
        for (const myTeam of teamsList) {
          if (parseInt(a.team.id) === myTeam.teamId) {
            return a;
          }
        }
      }
    });
    const scores = myTeamScores?.flat();
    const userScores = scores?.filter(
      (filterTeam) =>
        !!teamsList.some((myTeam) => parseInt(filterTeam.id) === myTeam.teamId)
    );
    setUserTeamScores(userScores);
  }, [pastScores, teamsList]);

  //   useEffect(() => {
  //     const events = pastScores?.events?.map(
  //       (event) => event.competitions[0].competitors
  //     );
  //     const myTeamScores = events?.filter((game) => {
  //       for (const a of game) {
  //         for (const localTeam of localTeamsList) {
  //           if (parseInt(a.team.id) === localTeam.teamId) {
  //             return a;
  //           }
  //         }
  //       }
  //     });
  //     const scores = myTeamScores?.flat();
  //     const localScores = scores?.filter(
  //       (filterTeam) =>
  //         !!localTeamsList.some(
  //           (myTeam) => parseInt(filterTeam.id) === myTeam.teamId
  //         )
  //     );
  //     setLocalTeamScores(localScores);
  //   }, [teamScores, teamsList, pastScores]);

  useEffect(() => {
    const events = pastScores?.events?.map(event => event.competitions[0].competitors)
    const myTeamScores = events?.filter((game) => {
      for (const a of game) {
        for (const localTeam of localTeamsList) {
          if (parseInt(a.team.id) === localTeam.teamId) {
            return a
          }
        }

      }
    })
    const scores = myTeamScores?.flat()
    const userScores = scores?.filter((filterTeam => !!localTeamsList.some(myTeam => parseInt(filterTeam.id) === myTeam.teamId)))
    setLocalTeamScores(userScores)


  }, [pastScores])

  useEffect(() => {
    const teamArr = Array.from(
      new Set(localTeamsList.map((a) => a.userId))
    ).map((id) => {
      return localTeamsList.find((a) => a.userId === id);
    });
    setUserTeams(teamArr);
  }, [localTeamsList, localTeamScores]);

  useEffect(() => {
    const scores = localTeamScores
      ?.filter((team) => localTeamsList.includes(parseInt(team.id)))
      .map((team) => parseInt(team.score));
    setTotal(scores);
  }, [localTeamScores]);

  useEffect(() => {
    const score = userTeamScores?.reduce((sum, currentScore) => {
      return sum + parseInt(currentScore.score);
    }, 0);
    setTotals(score);
  }, [userTeamScores]);

  useEffect(() => {
    const score = localTeamsList?.reduce((acc, item) => {
      acc[item.userId] = acc[item.userId] || [];
      acc[item.userId].push(item);
      return acc;
    }, []);
    setUserGroups(score);
  }, [localTeamsList]);

  useEffect(() => {
    let score = [];
    userGroups?.map((item) =>
      item.map((a) => {
        localTeamScores?.filter((team) => {
          if (parseInt(team.id) === a.teamId) {
            let arr = {};
            arr.id = a.userId;
            arr.name = a.user.name;
            arr.teamId = a.teamId;
            arr.score = parseInt(team.score);
            score.push(arr);
          }
        });
      })
    );
    setTotal(score);
  }, [localTeamScores, userGroups]);

  // useEffect(
  //     () => {
  //         localTeamsList?.map(teamObject => {
  //         updateTeamState("team", teamObject.id)
  //         buildTeamObject("teamId", teamObject.teamId)
  //         })
  //     },
  //     [localTeamsList]
  // )

  // const buildTeamObject = (idToModify, newValue) => {
  //     const newTeams = { ...groupTeams }
  //     newTeams[idToModify] = newValue
  //     setGroupTeams(newTeams)
  // }

  // const updateTeamState = (propToModify, newValue) => {
  //     const newObject = { ...chosenTeams }  // Copy of state
  //     newObject[propToModify] = newValue
  //     updateTeams(newObject)              // Update state with copy
  // }

  useEffect(() => {
    const totalScores = Array.from(
      totals?.reduce(
        (m, { name, score }) => m.set(name, (m.get(name) || 0) + score),
        new Map()
      ),
      ([name, score]) => ({ name, score })
    );
    const leader = totalScores?.sort((a, b) => b.score - a.score);
    setTotalScoresArr(leader);
  }, [totals]);

  useEffect(() => {
    fetch(
      `http://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?groups=80&week=${week}&limit=100`
    )
      .then((res) => res.json())
      .then((data) => {
        updatePastScores(data);
      });
  }, [week]);

  //const weeks = teamScores?.week?.number;

  return (
    <>
      <main className="mainContainer">
      <section className="scoreContainer">
          <select
            className="week__dropdown"
            onChange={(event) => {
              setWeek(parseInt(event.target.value) + 1);
            }}
          >
            <option value>Choose a week:</option>
            {Array.from(Array(weeks).keys()).map((week) => {
              return (
                <option value={week++} key={`week--${week++}`}>
                  Week:{week++}
                </option>
              );
            })}
          </select>
        </section>
        
        
        <section className="myTeamContainer">
          <h2>{currentUser?.user.name}'s Score</h2>
          {userTeamScores?.map((teamObject) => {
            return (
              <p key={`team--${teamObject.team.id}`}>
                {" "}
                <img src={teamObject.team.logo} className="teamsList" />{" "}
                {teamObject.team.displayName} {teamObject.score}
              </p>
            );
          })}
          <h3>
            You have {teamsList.length} teams on your roster for the week.
          </h3>
          <h3>Current score for the week {total}</h3>
        </section>
        {/* <section className="scoreContainer">
          <h3> Past Scores:</h3>
          <select
            className="week__dropdown"
            onChange={(event) => {
              setWeek(parseInt(event.target.value) + 1);
            }}
          >
            <option value>Choose a week:</option>
            {Array.from(Array(weeks).keys()).map((week) => {
              return (
                <option value={week++} key={`week--${week++}`}>
                  Week:{week++}
                </option>
              );
            })}
          </select>
        </section> */}
        <section className="localTeamContainer">
          <h2>Current Scores</h2>
          {localTeamScores?.map((teamObject) => {
            return (
              <p key={`team--${teamObject.team.id}`}>
                {" "}
                <img src={teamObject.team.logo} className="teamsList" />{" "}
                {teamObject.team.displayName} {teamObject.score}{" "}
              </p>
            );
          })}
        </section>
        <section className="leaderContainer">
          <h2>LeaderBoard</h2>
          {totalsArr?.map((team) => {
            return (
              <p>
                {" "}
                {team.name} {team.score}{" "}
              </p>
            );
          })}
        </section>
      </main>
    </>
  );
};
