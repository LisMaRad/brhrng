import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import FeatherIcon from "feather-icons-react";
import {storage} from "../firebaseConfig";

type UploadComponentProps = {
  setShowEndPopUp: (showEndPopUp: boolean) => void;
  file: any;
};

const UploadComponent = ({file, setShowEndPopUp } : UploadComponentProps) => {
  const handleUpload = async () => {
    if (!file) {
      alert("Bitte die Audio neu aufnehmen.");
      return;
    }

    const storageRef = ref(storage, `audio-${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

  };

  return (
  <button className="upload" onClick={() => {
    handleUpload().then(() => setShowEndPopUp(true));}}>
        <FeatherIcon icon="upload"></FeatherIcon>
      </button>
  );
}

export default UploadComponent;
