// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";

// Your web app's Firebase configuration
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
export const storage = getStorage(app);

let mediaRecorder;
let audioChunks = [];
let isRecording = false;


export function recording() {
  if (!isRecording) {
    startRecording();
    isRecording = true;
  }
  else {
    stopRecording();
    isRecording = false;
  }
}

// Start recording
async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.ondataavailable = (event) => audioChunks.push(event.data);
  mediaRecorder.start();
}

// Stop recording and preview
function stopRecording() {
  mediaRecorder.stop();
  mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    const audioUrl = URL.createObjectURL(audioBlob);
    const audioPlayer = document.getElementById("audio-player");
    audioPlayer.src = audioUrl;
    audioPlayer.load(); // Ensure the audio element loads the new source
  };
}

// Upload to Firebase
function uploadAudio() {
  const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
  const storageRef = ref(storage, `recordings/${Date.now()}.wav`);
  uploadBytes(storageRef, audioBlob).then((snapshot) => {
    console.log("Uploaded a blob!");
  });
}

window.recording = recording;
window.uploadAudio = uploadAudio;
