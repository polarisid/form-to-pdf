import React, { useCallback, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Stack from "@mui/material/Stack";
interface CameraCaptureProps {
  onCapture: (imageSrc: string) => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target?.result as string;
          onCapture(dataUrl);
        };
        reader.readAsDataURL(file);
      }
    },
    [onCapture]
  );

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    inputRef.current?.click();
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <IconButton onClick={handleButtonClick} aria-label="Tirar Foto">
        <CameraAltIcon />
      </IconButton>
      {/* <button onClick={handleButtonClick}>Tirar Foto</button> */}
    </>
  );
};

export default CameraCapture;
