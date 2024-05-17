import React, { useCallback, useRef } from "react";

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
      <button onClick={handleButtonClick}>Capture Photo</button>
    </>
  );
};

export default CameraCapture;
