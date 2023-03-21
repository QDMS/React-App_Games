import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/img/1.png", matched: false },
  { src: "/img/2.png", matched: false },
  { src: "/img/3.png", matched: false },
  { src: "/img/4.png", matched: false },
  { src: "/img/5.png", matched: false },
  { src: "/img/6.png", matched: false },
  { src: "/img/7.png", matched: false },
  { src: "/img/8.png", matched: false },
  { src: "/img/9.png", matched: false },
  { src: "/img/10.png", matched: false },
  { src: "/img/11.png", matched: false },
  { src: "/img/12.png", matched: false },
  { src: "/img/13.png", matched: false },
  { src: "/img/14.png", matched: false },
  { src: "/img/15.png", matched: false },
  // { src: "/img/16.png", matched: false },
  // { src: "/img/17.png", matched: false },
  // { src: "/img/18.png", matched: false },
  // { src: "/img/19.png", matched: false },
  // { src: "/img/20.png", matched: false },
  // { src: "/img/21.png", matched: false },
  // { src: "/img/22.png", matched: false },
  // { src: "/img/23.png", matched: false },
  // { src: "/img/24.png", matched: false },
  // { src: "/img/25.png", matched: false },
  // { src: "/img/26.png", matched: false },
  // { src: "/img/27.png", matched: false },
  // { src: "/img/28.png", matched: false },
  // { src: "/img/29.png", matched: false },
  // { src: "/img/30.png", matched: false },
  // { src: "/img/31.png", matched: false },
  // { src: "/img/32.png", matched: false },
  // { src: "/img/33.png", matched: false },
  // { src: "/img/34.png", matched: false },
  // { src: "/img/35.png", matched: false },
  // { src: "/img/36.png", matched: false },
  // { src: "/img/37.png", matched: false },
  // { src: "/img/38.png", matched: false },
  // { src: "/img/39.png", matched: false },
  // { src: "/img/40.png", matched: false },
  // { src: "/img/41.png", matched: false },
  // { src: "/img/42.png", matched: false },
  // { src: "/img/43.png", matched: false },
  // { src: "/img/44.png", matched: false },
  // { src: "/img/45.png", matched: false },
  // { src: "/img/46.png", matched: false },
  // { src: "/img/47.png", matched: false },
  // { src: "/img/48.png", matched: false },
  // { src: "/img/49.png", matched: false },
  // { src: "/img/50.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // start a new game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Magik Match</h1>
      <button className="glow-on-hover" onClick={shuffleCards}>
        New Game
      </button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p className="turns">Turns: {turns}</p>
      <h3>Created By: Qujuan Miller</h3>
    </div>
  );
}

export default App;
