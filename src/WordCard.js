import React, { useEffect, useState } from "react";
import _, { attempt } from "lodash";
import CharacterCard from "./CharacterCard";

const perpareStateFromWord = (given_word) => {
  let word = given_word.toUpperCase();
  let chars = _.shuffle(Array.from(word));
  return {
    word,
    chars,
    attempt: 1,
    guess: "",
    completed: false,
    timer: 0,
  };
};

export default function WordCard(props) {
  const [count, setCount] = useState(0);

  const [isActive, setIsActive] = useState(false);
  const [state, setState] = useState(perpareStateFromWord(props.value));
  const [words, setWords] = useState("");
  const [results, setResults] = useState("");
  
  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setCount((prev) => prev + 1);
      }, 1000);
    } else if (!isActive && count !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [count, isActive]);

  function toggle(val) {
    setIsActive(val);
  }

  const reset = () => {
    setState({ ...state, guess: "", attempt: state.attempt + 1 });
    setCount(0)
    setWords("")
    setResults("")
  }

  const activationHandler = (c) => {
    console.log(`${c} has been activated.`);
    let guess = state.guess + c;
    setState({ ...state, guess: guess });
    toggle(true);

    setWords(guess);
    if (guess.length == state.word.length) {
      if (guess == state.word) {
        console.log("yeah!");
        setState({
          ...state,
          completed: true,
          guess: "",
          attempt: state.attempt + 1,
        });
        toggle(false);
        setResults("Correct");
      } else {
        console.log("reset, next attempt");
        setState({ ...state, guess: "", attempt: state.attempt + 1 });
        setResults("Incorrect");
      }
    }

    console.log(guess);
  };

  return (
    <>
      
      {results != "" && (
        <>
          <div className="postion-win"> {results}</div>
          <div className="took">time {count} seconds</div>
        </>
      )}

      <h3 style={{ position: "fixed", right: "5%", top: "10px" }}>
        {count} Second
      </h3>
      <div>
        {state.chars.map((c, i) => (
          <CharacterCard
            value={c}
            key={i}
            activationHandler={activationHandler}
            attempt={state.attempt}
          />
        ))}
      </div>
      <h1 className="h1center">words : {words}</h1>
      <button className="retry" onClick={
            reset
          }>Retry</button>
    </>
  );
}
