import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const emojiAPI = `${process.env.REACT_APP_DIRECTUS_URL}/items/emoji`;
const settingsAPI = `${process.env.REACT_APP_DIRECTUS_URL}/items/settings`;

function EmojiDisplay(props: any) {
  const {value, onClick, mining} = props;
  return (
    <div>
      <p>{value}</p>
      {mining ? <p>Picando...</p> : <></>}
      {value === '👑' ? <p>¡Enhorabuena!</p> : <></>}
      <button onClick={onClick} >⛏️</button>
    </div>
  );
}

function App() {
  const [state, setState] = useState({
    result: '🤷',
    mining: false,
  });

  const handlePick = () => {
      setState({
        ...state,
        mining: true
      });
      updatePicks();
  }

  const updatePicks = async () => {
    const count = +(await axios.get(`${settingsAPI}/1`)).data.data.value;
    const current = +(await axios.patch(`${settingsAPI}/1`, { value: count + 1 })).data.data.value;
    const goal = +(await axios.get(`${settingsAPI}/2`)).data.data.value;
    if(current >= goal) {
      const gold = (await axios.get(`${emojiAPI}/1`)).data.data.character;
      setState({
        result: gold,
        mining: false
      });
    } else {
      setState({
        ...state,
        mining: false,
      })
    }
  }

   useEffect(() => {
    axios.patch(`${settingsAPI}/1`, { value: 0}).then();
  }, []); 
 


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <EmojiDisplay value={state.result} mining={state.mining} onClick={() => handlePick()}></EmojiDisplay>
      </header>
    </div>
  );
}

export default App;
