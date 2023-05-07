import './App.css';
import {useState} from 'react';
import Dictionary from '../Dictionary/Dictionary';
import Audio from '../Audio/Audio';

function App() {

// Set useState for input, types and definitions, word, phonetic, audio file
const [userInput, setUserInput] = useState("");
const [typeDefs, setTypeDefs] = useState([]);
const [word, setWord] = useState("");
const [phonetic, setPhonetic] = useState("");
const [audioFile, setAudioFile] = useState("");

// Function to handle input
function handleInput(e) {
  setUserInput(e.target.value);
}

  // WRITE ASYNC FUNCTION TO FETCH RESULTS FROM API
  async function fetchResults() {
    try { 
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${userInput}`);
    const data = await response.json();
   
    const meanings = data[0].meanings; // extract meanings array from data

    // extract types and definitions
    const typeDefs = [{
      type: meanings.map(meaning => meaning.partOfSpeech),
      defs: meanings.map(meaning => meaning.definitions.map(def => def.definition))
    }];

    // set types and definitions
    setTypeDefs(typeDefs);

    // set word and phonetic
    setWord(data[0].word)
    setPhonetic(data[0].phonetic);
    
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
    } 
    catch (error) { 
      console.log(error);
      alert("Sorry, we couldn't find that word. Please try again.");
    } 
  }

  // Function to handle submit
    function handleSubmit() {
      fetchResults();
      // clear input
      setUserInput("")
  }



  // Function to handle audio
  function handleAudio() {
    const audio = new Audio(audioFile);
    audio.play();
}

  return (
    <div className= "input-area">
    <div className="header">
      <h1>Simple Dictionary</h1>
      </div>

      <div className="search-area">
      <input  className="input-box" onChange={handleInput} value={userInput} placeholder="Type word here" text="Search"/>
      <button className="search-button" onClick={handleSubmit}>Search</button>
      </div>

      <div className="search-results">
        <h2>{word} {phonetic}</h2>
        <Audio audioFile={audioFile} onPlay={handleAudio}/>
        <Dictionary typeDefs={typeDefs}/>
        </div>
    </div>
  );

}

export default App;
