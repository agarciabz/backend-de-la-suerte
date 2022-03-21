import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const url = `${process.env.REACT_APP_DIRECTUS_URL}/items/emoji/1`;

function EmojiDisplay(props: any) {
  const {value} = props;
  return (
    <p>{value}</p>
  );
}

function App() {
  const [state, setState] = useState('🤷');

  useEffect(() => {
    axios.get(url).then((res) => {
      setState(res.data.data.character);
      console.log(res.data.data.character)
    }).catch(error => {
      setState('🤷');
      console.log(error);
    });
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <EmojiDisplay value={state}></EmojiDisplay>
      </header>
    </div>
  );
}

export default App;
