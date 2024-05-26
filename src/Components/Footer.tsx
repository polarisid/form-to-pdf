import styled from "styled-components";

const Footer = () => {
  return (
    <FooterStyled>
      <div>
        <span>© 2024 - Todos os direitos reservados </span>
        <span>
          Desenvolvido por{" "}
          <a href="http://www.dacari.com.br">Daniel Carvalho</a>
        </span>
      </div>
    </FooterStyled>
  );
};

const FooterStyled = styled.footer`
  background-color: #222;
  color: #fff;
  padding: 20px 0;
  text-align: center;
  font-size: 14px;

  div {
    max-width: 800px;
    margin: 0 auto;
  }

  span {
    color: #999;
    margin-right: 5px;
    flex-direction: column;
  }

  a {
    font-weight: bold;
    color: #fff;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #ccc;
    }
  }
`;

export default Footer;
