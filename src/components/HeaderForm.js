import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import { Body1Text, H1Text, theme } from "../styles/theme";

const HeaderForm = ({ headerChildren, descChildren, align }) => {
  return (
    <View>
      <Header align={align}>{headerChildren}</Header>
      <Desc align={align}>{descChildren}</Desc>
    </View>
  );
};

const Header = styled(H1Text)`
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: ${(props) => props.align};
`;

const Desc = styled(Body1Text)`
  color: ${theme.TextColor};
  text-align: ${(props) => props.align};
  margin-bottom: 20px;
`;

export default HeaderForm;
