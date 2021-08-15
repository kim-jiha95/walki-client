import React, { useState } from "react";
import { Image } from "react-native";
import styled from "styled-components";
import kakaoLogo from "../../../assets/icons/kakaotalkLogo.png";
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from "@react-native-seoul/kakao-login";
import { Caption, H4Text } from "../../styles/theme";
import { gql, useMutation } from "@apollo/client";

const KakaoLoginButton = ({ navigation }) => {
  const [result, setResult] = useState("");

  const SIGN_UP_MUTATION = gql`
    mutation signUp($social: Social!, $token: String!) {
      signUp(social: $social, token: $token) {
        scalar
      }
    }
  `;

  const [signUpMutation, { loading }] = useMutation(SIGN_UP_MUTATION);

  // refreshToken?
  // const handleKakaoLogin = async () => {
  //   const token = await login();
  //   const { accessToken } = token;

  //   setResult(token.accessToken);
  //   if (!loading) {
  //     signUpMutation({
  //       variables: {
  //         social: KAKAO,
  //         token: 0,
  //       },
  //     });
  //   }

  //   navigation.navigate("CoachSelect");
  // };

  const handleKakaoLogin = () =>
    navigation.reset({ routes: [{ name: "CoachSelect" }] });

  return (
    <Container>
      <KakaoButton onPress={handleKakaoLogin}>
        <Image source={kakaoLogo} />
        <KakaoText>카카오로 시작하기</KakaoText>
      </KakaoButton>
      <KakaoDesc>
        walki의 이용약관 과 개인정보처리방침을 읽고 이해했으며 {"\n"}그에
        동의합니다.
      </KakaoDesc>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  align-items: center;
  padding: 15px 30px;
`;

const KakaoButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #ffe812;
  border-radius: 8px;
  width: 100%;
  height: 54px;
`;

const KakaoText = styled(H4Text)`
  margin-left: 5px;
`;

const KakaoDesc = styled(Caption)`
  color: #bdbdbd;
  text-align: center;
  margin: 10px 0;
`;

export default KakaoLoginButton;