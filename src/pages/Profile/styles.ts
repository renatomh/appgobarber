import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

/* Estilizando o container */
export const Container = styled.View`
    flex: 1;
    justify-content: center;
    /* Adicionando um espaçamento inferior no Android para quando o teclado for aberto */
    padding: 0 30px ${Platform.OS == 'android' ? 30 : 40}px;
`;

/* Estilizando o título */
export const Title = styled.Text`
    font-size: 24px;
    color: #f4ede8;
    /* Definindo a fonte customizada */
    font-family: 'RobotoSlab-Medium';
    margin: 24px 0;
`;

/* Estilizando o botão de voltar */
export const BackButton = styled.TouchableOpacity`
    /* Alinhando próximo ao avatar */
    margin-top: 40px;
`;

/* Estilizando o botão do avatar */
export const UserAvatarButton = styled.TouchableOpacity`
    margin-top: 32px;
`;

/* Estilizando o avatar */
export const UserAvatar = styled.Image`
    width: 186px;
    height: 186px;
    border-radius: 98px;
    align-self: center;
`;
