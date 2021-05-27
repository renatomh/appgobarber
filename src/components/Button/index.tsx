import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

// Crianndo a interface para as propriedades do botão
interface ButtonProps extends RectButtonProperties {
  // Forçando o conteúdo do botão a ser passado como uma string
  children: string;
}

// Criando o componente do botão com as propriedades do RectButton estendida
const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container {...rest}>
    <ButtonText>{children}</ButtonText>
  </Container>
);

export default Button;
