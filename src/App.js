import React from 'react';
import './App.css';
import colors from './colors';
import {useState} from 'react';
import {shuffle} from 'lodash';

function App() {
  const [cards,setCards] = useState( shuffle([...colors, ...colors]) );
  const [clicks,setClicks] = useState(0);
  const [won,setWon] = useState(false);
  const [activeCards,setActiveCards] = useState([]);
  const [foundPairs,setFoundPairs] = useState([]);

  function flipCard(index) {
    if (won) {
      setCards(shuffle([...colors, ...colors]));
      setFoundPairs([]);
      setWon(false);
      setClicks(0);
    }
    if (activeCards.length === 0) {
      setActiveCards([index]);
    }
    if (activeCards.length === 1) {
      const firstIndex = activeCards[0];
      const secondsIndex = index;
      if (cards[firstIndex] === cards[secondsIndex]) {
        if (foundPairs.length + 4 === cards.length) {
          setWon(true);
        }
        setFoundPairs( [...foundPairs, firstIndex, secondsIndex] );
      }
      setActiveCards([...activeCards, index]);
    }
    if (activeCards.length === 2) {
      setActiveCards([index]);
    }
    setClicks(clicks + 1);
  }

  return (
    <div>
      <div className="App">
        <div className="App__field">
          {cards.map((card,index) => {
          const openedColor =  (activeCards.indexOf(index) !== -1) || foundPairs.indexOf(index) !== -1;
          const foundColor =  foundPairs.indexOf(index) !== -1;
          return (
            <div className={"App__card " + (openedColor ? 'opened' : '') + (foundColor ? ' found' : '')}
                 onClick={() => flipCard(index)}>
              <div className="App__color" style={{background: `${card}`}}>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
}

export default App;
