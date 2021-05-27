import React, { useCallback, useEffect, useState } from 'react';

import Icon from 'react-native-vector-icons/Feather';
// Pegando o contexto de autenticação
import { useNavigation } from '@react-navigation/core';
import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  LogoutButton,
  UserAvatar,
  ProvidersList,
  ProvidersListTitle,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
} from './styles';

// Tipagem para os prestadores de serviço
// Disponibilizamos ainda para o arquivo de estilização
export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  // Pegando os dados e métodos para o usuário logado
  const { signOut, user } = useAuth();
  // Definindo o navegador para as rotas
  const { navigate } = useNavigation();

  // Estado para armazenar os prestadores de serviço
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    // Pegando os dados dos prestadores de serviço da API
    api.get('providers').then((response) => {
      // Salvando a resposta no estado de prestadores de serviço
      setProviders(response.data);
    });
  }, []);

  // Função para navegar para a página de perfil
  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  // Função para navegar para a página de criação de agendamento
  const navigateToCreateAppointment = useCallback(
    (providerId: string) => {
      // Indo para a página e passado o ID do prestador de serviços selecionado
      navigate('CreateAppointment', { providerId });
    },
    [navigate],
  );

  return (
    <Container>
      {/* Cabeçalho da página */}
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        {/* Botão para navegar para a página de perfil */}
        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>

        <LogoutButton onPress={signOut}>
          <Icon name="log-out" size={20} color="#FF9000" />
        </LogoutButton>
      </Header>

      {/* Lista para os prestadores de serviço */}
      <ProvidersList
        data={providers}
        keyExtractor={(provider) => provider.id}
        // Definindo o cabeçalho/título para a lista
        ListHeaderComponent={
          <ProvidersListTitle>Cabeleireiros</ProvidersListTitle>
        }
        // Necessário adicionar essa parte para evitar que o último item seja cortado
        // Ref: https://stackoverflow.com/questions/46196242/react-native-flatlist-last-item-visibility-issue
        // No caso, usamos o dobro do 'margin-bottom' do 'ProviderContainer'
        contentContainerStyle={{ paddingBottom: 32 }}
        renderItem={({ item: provider }) => (
          // Quando é necessário chamar uma função passando um parâmetro,
          // precisamos utilizar uma 'arrow function': () => {}
          <ProviderContainer
            onPress={() => {
              navigateToCreateAppointment(provider.id);
            }}
          >
            <ProviderAvatar source={{ uri: provider.avatar_url }} />

            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>

              <ProviderMeta>
                <Icon name="calendar" size={14} color="#FF9000" />
                <ProviderMetaText>Segunda à sexta</ProviderMetaText>
              </ProviderMeta>

              <ProviderMeta>
                <Icon name="clock" size={14} color="#FF9000" />
                <ProviderMetaText>8h às 18h</ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}
      />
    </Container>
  );
};

export default Dashboard;
