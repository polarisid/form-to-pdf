import React from "react";
import styled from "styled-components";

interface HeaderProps {
  version: string;
}

const Header = ({ version }: HeaderProps) => {
  return (
    <HeaderStyled>
      <Title>Relatório de Atendimento</Title>
      <Subtitle>RAC - Ar Condicionado</Subtitle>
      <Description>Lembre-se de ler atentamente todas as perguntas</Description>
      <Version>Versão {version}</Version>
    </HeaderStyled>
  );
};

const HeaderStyled = styled.header`
  background-color: #343a40;
  color: #fff;
  padding: 40px 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-size: 36px;
  margin-bottom: 10px;
`;

const Subtitle = styled.h2`
  font-family: "Montserrat", sans-serif;
  font-size: 24px;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-weight: 500;
`;

const Version = styled.p`
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  margin-top: 20px;
  opacity: 0.7;
`;

export default Header;
