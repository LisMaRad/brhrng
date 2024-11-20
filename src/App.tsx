import React, { useRef, useState } from 'react';
import FeatherIcon from "feather-icons-react";
import PopUp from "./Components/PopUp";
import UploadComponent from "./Components/Upload";

function App() {
  const [showIntroPopUp, setShowIntroPopUp] = useState(true);
  const [showEndPopUp, setShowEndPopUp] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [blobURL, setBlobURL] = useState('');
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);

  const mediaStream = useRef<MediaStream | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  async function startRecording() {
    setIsRecording(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStream.current = stream;

      const recorder = new MediaRecorder(stream);
      mediaRecorder.current = recorder;

      recorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          chunks.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const recordedBlob = new Blob(chunks.current, { type: 'audio/mpeg' });
        const url = URL.createObjectURL(recordedBlob);
        setRecordedBlob(recordedBlob); // Set the recorded Blob
        setBlobURL(url); // For playback
        chunks.current = [];
      };

      recorder.start();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  }

  function stopRecording() {
    setIsRecording(false);
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop();
    }

    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => track.stop());
      mediaStream.current = null;
    }
  }

  function deleteRecording() {
    setRecordedBlob(null); // Clear the recorded blob
    setBlobURL(''); // Clear the playback URL
  }

  return (
    <>
      <h1>B:R:HR:NG</h1>
      <div className="audio">
        {recordedBlob && <div className="audio-controllers">
          <audio id="audio-player" src={blobURL} controls></audio>
          <UploadComponent setShowEndPopUp={setShowEndPopUp} file={recordedBlob}/>
          <button
            className="delete"
            onClick={deleteRecording}
          >
            <FeatherIcon icon="trash-2"/>
          </button>
        </div>}

        <button
          id="recordingButton"
          onClick={() => (!isRecording ? startRecording() : stopRecording())}
          style={{color: isRecording ? 'green' : 'inherit'}}
        >
          <FeatherIcon icon="circle"></FeatherIcon>
          <FeatherIcon icon="mic"></FeatherIcon>
        </button>
      </div>
      {showIntroPopUp && (
        <PopUp>
          <h2>Herzlich Willkommen bei B:R:HR:NG - dem Labor für ersehnte Berührungen! Eine multimediale
            Performance, die utopische Berührungen visualisiert!
          </h2>
          <p>Nach welcher Berührung sehnst du dich?
            Mit wem, wo und wie findet sie statt? Beschreibe uns deine utopische Berührung.
          </p>
          <p>Im Digitalen Foyer der ARGEkultur kannst du die Beschreibungen bereits gewünschter ersehnter
            Berührungen hören.
          </p>
          <p>Beachte: Mit Absenden der Audioaufnahme willigst du ein, dass das Material für künstlerische Zwecke
            öffentlich verwendet werden darf!
          </p>
          <button onClick={() => { setShowIntroPopUp(false); }}>Schließen</button>
        </PopUp>
      )}
      {showEndPopUp && (
        <PopUp>
          <h2>Vielen Dank für die Beschreibung deiner ersehnten Berührung!</h2>
          <p>Im Digitalen Foyer der ARGEkultur kannst du die
            Beschreibungen bereits gewünschter utopischer Berührungen hören.
          </p>
          <a href="https://hubs.xrspaces.de/64Ve3bB/raum1">
            <div>Zum digitalen Foyer</div>
            <FeatherIcon icon="arrow-right"></FeatherIcon>
          </a>
        </PopUp>
      )}
    </>
  );
}

export default App;
