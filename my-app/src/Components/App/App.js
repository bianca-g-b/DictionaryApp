import './App.css';
import {useState, useEffect} from 'react';
import Dictionary from '../Dictionary/Dictionary';
import ReactAudioPlayer from 'react-audio-player';
import Audio from '../Audio/Audio';

function App() {
// set useState for input
// set useState for search results

const [userInput, setUserInput] = useState("");
const [typeDefs, setTypeDefs] = useState([]);
const [word, setWord] = useState("");
const [phonetic, setPhonetic] = useState("");
const [audioFile, setAudioFile] = useState("");

function handleInput(e) {
  setUserInput(e.target.value);
}


function handleSubmit(e) {
  e.preventDefault();
  async function fetchResults() {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${userInput}`);
    const data = await response.json();
   
    const meanings = data[0].meanings; // extract meanings array from API

    // extract types and definitions
    const typeDefs = [{
      type: meanings.map(meaning => meaning.partOfSpeech),
      defs: meanings.map(meaning => meaning.definitions.map(def => def.definition))
    }];

    console.log(typeDefs[0].type)
    console.log(typeDefs[0].defs[0]);

    // set word
    setWord(data[0].word)
    setPhonetic(data[0].phonetic);
    
   // set types and definitions
    setTypeDefs(typeDefs);
    console.log(data);

    // set audio file
    for (let i = 0; i < data[0].phonetics.length; i++) {
      if (data[0].phonetics[i].audio !== "") {
        setAudioFile(data[0].phonetics[i].audio);
        break;
      }
      else {
        setAudioFile("");
      }
    }

    console.log("Audio:",data[0].phonetics[0].audio,"stop");
  }
  fetchResults();
  }

  // Write a function to handle audio
  function handleAudio() {
    const audio = new Audio(audioFile);
    audio.play();
}

  return (
    <div className= "input-area">
      <h1>Simplified dictionary</h1>
      <div className="search-area">
      <input  onChange={handleInput}  placeholder="Type word here" text="Search"/>
      <button onClick={handleSubmit}>Click to search</button>
      </div>
      <div className="search-results">
        <h2>Search results</h2>
        <h3>{word} {phonetic}</h3>
        <Audio audioFile={audioFile} onPlay={handleAudio}/>
       
        <Dictionary typeDefs={typeDefs}/>
        </div>
    </div>
  );

}

export default App;
