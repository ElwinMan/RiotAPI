import React, { useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  const [searchText, setSearchText] = useState("");
  const [playerData, setPlayerData] = useState({});
  const API_KEY = "RGAPI-6ba9b73b-a2e3-4a11-8445-1a963efe30a9"

  function searchForPlayer(event) {
    // Set up API call
    var APIcallString = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + searchText + "?api_key=" + API_KEY;
    // Handle the API call
    axios.get(APIcallString).then(function (response) {
      // Success
      setPlayerData(response.data);
  
    }).catch(function (error) {
      // Error
      console.log(error);
    });
  }

  console.log(playerData);

  return (
    <div className="App">
      <div className="container">
        <h5> League of Legends Player Searcher</h5>
        <input type="text" onChange={e => setSearchText(e.target.value)}></input>
        <button onClick={e => searchForPlayer(e)}>Search for player</button>
      </div>
      {JSON.stringify(playerData) != '{}' ? 
      <>
        <p>{playerData.name}</p>
        <img width="100" height="100" src={"http://ddragon.leagueoflegends.com/cdn/12.11.1/img/profileicon/" + playerData.profileIconId + ".png"}></img>
        <p>Summoner level: {playerData.summonerLevel}</p>
      </>
      : 
      <><p>no player data</p></>
      
      }
    </div>
  );
}

export default App;
