import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

/* Estilizando o container */
export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  /* Adicionando um espaçamento inferior no Android para quando o teclado for aberto */
  padding: 0 30px ${Platform.OS === 'android' ? 65 : 40}px;
`;

/* Estilizando o título */
export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  /* Definindo a fonte customizada */
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;
`;

/* Estilizando os elementos para "VOltar para o login" */
export const BackToSignIn = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #312e38;
  border-top-width: 1px;
  border-color: #232129;
  /* Verificando se há espaço suficiente embaixo da tela no iPhone para sair do aplicativo */
  padding: 16px 0 ${16 + getBottomSpace()}px;

  /* display: flex; O React-native coloca automaticamente o 'display: flex;' */
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const BackToSignInText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
`;
