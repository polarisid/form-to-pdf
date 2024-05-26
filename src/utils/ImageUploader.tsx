import React, { useState } from "react";
import ImageUploader from "react-images-upload";

interface ImageUploaderProps {
  onUpload: (files: File[]) => void;
}

const MyImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const [pictures, setPictures] = useState<File[]>([]);
  const [progress, setProgress] = useState(0);

  const onDrop = (pictureFiles: File[], pictureDataURLs: string[]) => {
    setPictures((prevPictures) => [...prevPictures, ...pictureFiles]);
    onUpload(pictureFiles);
  };

  const onProgress = (percent: number) => {
    setProgress(percent);
  };

  return (
    <div>
      <ImageUploader
        withIcon={true}
        buttonText="Escolher Imagem"
        onChange={onDrop}
        imgExtension={[".jpg", ".png"]}
        maxFileSize={5242880}
        withPreview={true}
        singleImage={true}
        key={pictures.length} // Chave única para re-renderizar o componente quando uma nova imagem for adicionada
      />
      {progress > 0 && progress < 100 && <div>Progresso: {progress}%</div>}
    </div>
  );
};

export default MyImageUploader;
