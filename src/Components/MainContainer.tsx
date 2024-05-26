import React from "react";
import styled from "styled-components";
export default function MainContainer({ ...props }) {
  return <Container>{props.children}</Container>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 0px;
  border: 0px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
