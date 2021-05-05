import React from 'react';
import { render } from '@testing-library/react-native';
import SignIn from '../../pages/SignIn';

// Criando mock para funções específicas do React Native
jest.mock('@react-navigation/native', () => {
    return {
        useNavigation: jest.fn(),
    };
});

// Definindo a descrição para a suite de testes
describe('SignIn Page', () => {
    it('should contain email/password inputs', async () => {
        // Renderizando a página a ser testada e pegando os elementos necessários
        // Dica: no React Native, ao utilizar a função 'getByTestId',
        // o ID do elemento deve ser definido como, por exemplo, 'testID="test-id"'
        const { getByPlaceholderText } = render(<SignIn />);

        // Verificando se o retorno foi conforme o esperado
        expect(getByPlaceholderText('E-mail')).toBeTruthy();
        expect(getByPlaceholderText('Senha')).toBeTruthy();
    });
});
