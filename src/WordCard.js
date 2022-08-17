import React, { useState } from "react";
import _, { attempt } from 'lodash';
import CharacterCard from "./CharacterCard";

const perpareStateFromWord = given_word => {
    let word = given_word.toUpperCase()
    let chars = _.shuffle(Array.from(word))
    return {
        word,
        chars,
        attempt: 1,
        guess: '',
        completed: false
    }
}

export default function WordCard(props) {

    const [state, setState] = useState(perpareStateFromWord(props.value))
    const [words, setWords] = useState("");
    const [results, setResults] = useState("");

    const activationHandler = c => {
        console.log(`${c} has been activated.`)
        let guess = state.guess + c
        setState({...state, guess: guess})
        
        setWords(guess)
        if(guess.length == state.word.length) {
            if(guess == state.word) {
                console.log('yeah!')
                setState({
                    ...state,
                    completed: true,
                    guess: "",
                    attempt: state.attempt + 1,
                  });
                setState({...state, completed: true})
                setResults("You win");
            }else {
                console.log("reset, next attempt");
        setState({ ...state, guess: "", attempt: state.attempt + 1 });
        setResults("You lose");
            }
        }

        console.log(guess)
    }

    return (
        <>
            <h1>words : {words}</h1>
            {results != "" && (
            <>
                <div className="postion-win"> {results}</div>
            </>
            )}

            <div>
            {
                state.chars.map((c, i) =>
                     <CharacterCard value= {c} key={i} activationHandler={activationHandler} attempt={state.attempt}/>)
            }
        </div>
        </>
    );

}