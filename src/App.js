import React from 'react';
import './App.css';
import WordCard from './WordCard';

const word = "Hello";
function App() {
  return (
    <div className='position'>
      <WordCard value={word}/>
    </div>
  );
}

export default App;