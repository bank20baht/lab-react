import React from 'react';
import './App.css';
import WordCard from './WordCard';
document.body.style = 'background: #EDDCD2;';

const word = "Hello";
function App() {
  return (
    <div className='position'>
      <WordCard value={word}/>
    </div>
  );
}

export default App;