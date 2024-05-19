import CameraCapture from "../camera";
import React from "react";
import styled from "styled-components";
interface PictureSendBoxProps {
  selectedSession: string;
  setSelectedSession: (session: string) => void;
  handleCapture: (imageSrc: string) => void;
  capturedImages: { session: string; image: string }[];
}
const PictureSendBox: React.FC<PictureSendBoxProps> = ({
  selectedSession,
  setSelectedSession,
  handleCapture,
  capturedImages,
}) => {
  return (
    <PictureContainerStyled>
      <h1>EVIDENCIAS - ( EM DESENVOLVIMENTO)</h1>
      <div>
        <label htmlFor="session">Selecione uma sessão:</label>
        <select
          id="session"
          value={selectedSession}
          onChange={(e) => setSelectedSession(e.target.value)}
        >
          <option value="">Selecione...</option>
          <option value="Produto/Instalação">
            Fotos do Produto/Instalação
          </option>
          <option value="Testes">Fotos dos Testes</option>
          <option value="Peças">Fotos das Peças</option>
          <option value="Defeito">Fotos do Defeito</option>
        </select>
      </div>
      <div>
        <h2>Tire uma foto</h2>
        <CameraCapture onCapture={handleCapture} />
      </div>
      <div>
        {/* <h2>Upload de Foto</h2>
      <ImageUploader
        withIcon
        buttonText="Escolher Imagem"
        onChange={handleImageUpload}
        imgExtension={[".jpg", ".png"]}
        maxFileSize={5242880}
      /> */}
      </div>
      {capturedImages.length > 0 && (
        <div>
          <h2>Preview</h2>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {capturedImages.map((capture: any, index: any) => (
              <div key={index} style={{ margin: "10px" }}>
                <img
                  src={capture.image}
                  alt={`Captured ${index}`}
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
                <p>Sessão: {capture.session}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </PictureContainerStyled>
  );
};

const PictureContainerStyled = styled.div`
  h1 {
    font-size: 1rem;
  }
`;

export default PictureSendBox;
