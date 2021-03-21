import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
    isFocused: boolean;
    isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
    width: 100%;
    height: 60px;
    padding: 0 16px;
    background: #232129;
    border-radius: 10px;
    margin-bottom: 9px;
    border-width: 2px;
    border-color: #232129;

    /* Deixando o ícone ao lado do texto */
    flex-direction: row;
    align-items: center;

    /* Verificando se está com erro ou não */
    ${props => props.isErrored && css`
        border-color: #c53030;
    `}

    /* Verificando se está clicado ou não */
    ${props => props.isFocused && css`
        border-color: #ff9000;
    `}
`;

export const TextInput = styled.TextInput`
    /* Ocupando todo o tamanho dentro */
    flex: 1;
    color: #fff;
    font-size: 16px;
    font-family: 'RobotoSlab-Regular';
`;

export const Icon = styled(FeatherIcon)`
    margin-right: 16px;
`;