import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RectButton } from 'react-native-gesture-handler';

/* Estilizando o container */
export const Container = styled.SafeAreaView`
    flex: 1;
    /* Centralizando o conteúdo na tela */
    justify-content: center;
    align-items: center;
    padding: 0 24px;
`;

export const Title = styled.Text`
    font-size: 32px;
    color: #F4EDE8;
    font-family: 'RobotoSlab-Medium';
    margin-top: 48px;
    text-align: center;
`;

export const Description = styled.Text`
    font-family: 'RobotoSlab-Regular';
    font-size: 18px;
    color: #999591;
    margin-top: 16px;
    text-align: center;
`;

export const OkButton = styled(RectButton)`
    background: #FF9000;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin-top: 24px;
    padding: 12px 24px;
`;

export const OkButtonText = styled.Text`
    font-family: 'RobotoSlab-Medium';
    color: #312E38;
    font-size: 18px;
`;
