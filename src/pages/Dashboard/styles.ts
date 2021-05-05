import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

/* Pegando a tipagem para os prestadores de serviço */
import { Provider } from './index';
import { RectButton } from 'react-native-gesture-handler';

/* Estilizando o container */
export const Container = styled.SafeAreaView`
    flex: 1;
`;

/* Estilizando o cabeçalho */
export const Header = styled.View`
    padding: 24px;
    /* Definindo o espaçamento da barra de notficações */
    padding-top: ${getStatusBarHeight() + 24}px;
    background: #28262E;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

/* Estilizando o título do cabeçalho */
export const HeaderTitle = styled.Text`
    color: #F4EDE8;
    font-size: 24px;
    font-family: 'RobotoSlab-Regular';
    line-height: 28px;
`;

/* Estilizando o nome do usuário */
export const UserName = styled.Text`
    color: #FF9000;
    font-family: 'RobotoSlab-Medium';
`;

/* Estilizando o botão para acessar o perfil do usuário */
export const ProfileButton = styled.TouchableOpacity`
    /* Empurrando o botão para a esquerda */
    margin-left: auto;
`;

/* Estilizando o botão para sair o aplicativo */
export const LogoutButton = styled.TouchableOpacity`
    margin-left: 12px;
`;

/* Estilizando a imagem de perfil do usuário */
export const UserAvatar = styled.Image`
    width: 56px;
    height: 56px;
    /* Para a imagem ficar redonda, colocamos como raio da borda metade do tamanho da mesma */
    border-radius: 28px;
`;

/* Estilizando a lsita de prestadores de serviço */
/* Aqui temos de fazer essa gambiarra para estilizar os itens da lista */
export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
    padding: 32px 24px 16px;
`;

/* Estilizando o títula da lista de prestadores de serviços */
export const ProvidersListTitle = styled.Text`
    font-size: 24px;
    margin-bottom: 24px;
    color: #F4EDE8;
    font-family: 'RobotoSlab-Medium';
`;

/* Estilizando o botão com os dados do prestador de serviço */
export const ProviderContainer = styled(RectButton)`
    background: #3E3B47;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 16px;
    flex-direction: row;
    align-items: center;
`;

/* Estilizando o avatar do prestador de serviços */
export const ProviderAvatar = styled.Image`
    width: 72px;
    height: 72px;
    border-radius: 36px;
`;

/* Estilizando o campo de informações do prestador de serviços */
export const ProviderInfo = styled.View`
    flex: 1;
    /* Distanciando um pouco da imagem */
    margin-left: 20px;
`;

/* Estilizando o nome do prestador de serviços */
export const ProviderName = styled.Text`
    font-family: 'RobotoSlab-Medium';
    font-size: 18px;
    color: #F4EDE8;
`;

/* Estilizando os metadados do prestador de serviços */
export const ProviderMeta = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 8px;
`;

/* Estilizando o texto para o prestador de serviços */
export const ProviderMetaText = styled.Text`
    margin-left: 8px;
    color: #999591;
    font-family: 'RobotoSlab-Regular';
`;
