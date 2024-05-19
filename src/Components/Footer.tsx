import styled from "styled-components";
export default function Footer() {
  return (
    <FooterStyled>
      <a>2024 - Desenvolvido por </a>
      <a href="http://www.dacari.com.br">Daniel Carvalho</a>
    </FooterStyled>
  );
}

const FooterStyled = styled.div`
  a {
    padding-top: 10px;
    text-decoration: none;
  }
`;
