import { useState, useEffect } from "react";
import './App.css';
import teamsPic from "./components/assets/team.png";
import firstPlaceImage from "./components/assets/firstPlaceImage.jpeg";
import secondPlaceImage from "./components/assets/secondPlaceImage.jpeg";
import thirdPlaceImage from "./components/assets/thirdPlaceImage.jpg";

function App() {

  const [teamsData, setTeamsData] = useState([]);

  const getData = async () => {
    const response = await fetch("http://localhost:4000/getTeams", { method: "GET" });
    try {
      if (response.ok) {
        let data = await response.json();
        data = data.sort((a, b) => b.score - a.score);
        setTeamsData(data);
      } else {
        console.error("Failed to fetch profile posts");
      }
    } catch (e) {
      console.log("Error Occured : ", e);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(teamsData);
  }, [teamsData]);

  return (
    <div className="body">
      <div className="leaderboard">
        <div className="headings">
          <p>Rank</p>
          <p>Team Name</p>
          <p>Total Games Played</p>
          <p>Score</p>
        </div>

        {teamsData.map((team, index) => {

          let rankImage;
          if (index === 0) {
            rankImage = firstPlaceImage;
          } else if (index === 1) {
            rankImage = secondPlaceImage;
          } else if (index === 2) {
            rankImage = thirdPlaceImage;
          }

          return (
            <div className="leaderboard-body" key={index}>
              {/* <img src={khan} alt="team-ranking" className="rank-img" /> */}
              {/* <p>{teams.rank}</p> */}

              {rankImage && <img src={rankImage} alt="team-ranking" className="rank-img" />}
              {!rankImage && <p className="rank-number">{team.rank}</p>}
              <div className="team-profile-data">
                <img src={teamsPic} alt="team-profile" className="profile-img" />
                <p>{team.name}</p>
              </div>
              <p>{team.gamesPlayed}</p>
              <p>+ {team.score}</p>
            </div>
          )
        })}


      </div>
    </div>
  );
}

export default App;
