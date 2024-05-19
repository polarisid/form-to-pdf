import React from "react";
import styled from "styled-components";
export default function Header({ ...props }) {
  return (
    <HeaderStyled>
      <h1>RELATÓRIO DE ATENDIMENTO RAC - AR CONDICIONADO</h1>
      <p>Lembre-se de ler atentamente todas as perguntas</p>
    </HeaderStyled>
  );
}

const HeaderStyled = styled.div`
  h1 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.5em;
  }
  p {
    font-weight: 800;
  }
`;
