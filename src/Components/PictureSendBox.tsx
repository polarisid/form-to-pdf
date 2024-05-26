import CameraCapture from "../utils/camera";
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
      <SectionTitle>EVIDÊNCIAS</SectionTitle>
      <SessionSelection>
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
      </SessionSelection>
      <PhotoCaptureSection>
        <PhotoCaptureTitle>Tire uma foto</PhotoCaptureTitle>
        <CameraCapture onCapture={handleCapture} />
      </PhotoCaptureSection>
      {capturedImages.length > 0 && (
        <PreviewSection>
          <PreviewTitle>Preview</PreviewTitle>
          <ImagesGrid>
            {capturedImages.map((capture, index) => (
              <PreviewImage key={index}>
                <img src={capture.image} alt={`Captured ${index}`} />
                <SessionLabel>Sessão: {capture.session}</SessionLabel>
              </PreviewImage>
            ))}
          </ImagesGrid>
        </PreviewSection>
      )}
    </PictureContainerStyled>
  );
};

const PictureContainerStyled = styled.div`
  padding: 20px;
`;

const SectionTitle = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const SessionSelection = styled.div`
  margin-bottom: 20px;

  label {
    margin-right: 10px;
  }

  select {
    padding: 8px;
    font-size: 16px;
  }
`;

const PhotoCaptureSection = styled.div`
  margin-bottom: 20px;
`;

const PhotoCaptureTitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const PreviewSection = styled.div`
  margin-top: 20px;
`;

const PreviewTitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const ImagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 10px;
`;

const PreviewImage = styled.div`
  img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
  }
`;

const SessionLabel = styled.p`
  margin-top: 5px;
  font-size: 14px;
`;

export default PictureSendBox;
