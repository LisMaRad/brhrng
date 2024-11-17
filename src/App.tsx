import React from 'react';
import logo from './logo.svg';
import './App.css';
import FeatherIcon from "feather-icons-react";
import PopUp from "./Components/PopUp";
import { initializeApp } from "firebase/app";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";

function App() {
  const [showIntroPopUp, setShowIntroPopUp] = React.useState(true);
  const [showEndPopUp, setShowEndPopUp] = React.useState(false);
  const [isRecording, setIsRecording] = React.useState(false);
  const [blobURL, setBlobURL] = React.useState('');

  const firebaseConfig = {
    apiKey: "AIzaSyD-ji_K96-SHM44s_OvT5nbua0n05ORn6E",
    authDomain: "brhrng-7cbc5.firebaseapp.com",
    projectId: "brhrng-7cbc5",
    storageBucket: "brhrng-7cbc5.firebasestorage.app",
    messagingSenderId: "1023104423833",
    appId: "1:1023104423833:web:052cfbd26a8bd524f62508"
  };

// Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);


  function startRecording() {
    setIsRecording(true);
  }

  function stopRecording() {
    setIsRecording(false);
  }
  return (
      <>
      <h1>B:R:HR:NG</h1>
        <div className="audio">
          <div className="audio-controllers">
            <audio id="audio-player" src={blobURL} controls></audio>
            <button className="upload" onClick={() => setShowEndPopUp(true)}>
              <FeatherIcon icon="upload"></FeatherIcon>
            </button>
            <button className="delete">
              <FeatherIcon icon="trash-2"></FeatherIcon>
            </button>
          </div>
          <button id="recordingButton" onClick={() => !isRecording ? startRecording() : stopRecording()} style={{ color: isRecording ? 'green' : 'inherit' }}>
            <FeatherIcon icon="circle"></FeatherIcon>
            <FeatherIcon icon="mic"></FeatherIcon>
          </button>
        </div>
        {showIntroPopUp &&
        <PopUp><h2>Herzlich Willkommen bei B:R:HR:NG - dem Labor für ersehnte Berührungen! Eine multimediale
          Performance, die utopische Berührungen visualisiert!</h2>

          <p>Nach welcher Berührung sehnst du dich?
            Mit wem, wo und wie findet sie statt? Beschreibe uns deine utopische Berührung.</p>

          <p>Im Digitalen Foyer der ARGEkultur kannst du die Beschreibungen bereits gewünschter ersehnter Berührungen
            hören.</p>

          <p>Beachte: Mit Absenden der Audioaufnahme willigst du ein, dass das Material für künstlerische Zwecke
            öffentlich verwendet werden darf!</p>
          <button onClick={() => {setShowIntroPopUp(false)}}>Schließen</button>
        </PopUp> }

        {showEndPopUp &&
            <PopUp><h2>Vielen Dank für die Beschreibung deiner ersehnten Berührung!</h2>
              <p>Im Digitalen Foyer der ARGEkultur kannst du die
                Beschreibungen bereits gewünschter utopischer Berührungen hören.
              </p>

              <a href="https://www.google.at">
                <div>Zum digitalen Foyer</div>
                <FeatherIcon icon="arrow-right"></FeatherIcon></a>

            </PopUp>}
      </>
  );
}

export default App;
