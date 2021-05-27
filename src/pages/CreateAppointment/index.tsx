import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Platform } from 'react-native';
import { format } from 'date-fns';

import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';

// Pegando o contexto de autenticação
import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  Content,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
} from './styles';

// Tipagem para os parâmetros recebidos via navegação
interface RouteParams {
  providerId: string;
}

// Tipagem para os prestadores de serviço
// Disponibilizamos ainda para o arquivo de estilização
export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

// Tipagem para a disponbilidade do dia
interface Availability {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  // Pegando os dados e métodos para o usuário logado
  const { user } = useAuth();
  // Definindo o navegador para as rotas
  const { navigate, goBack } = useNavigation();

  // Pegando os dados passados na navegação para as páginas
  const route = useRoute();
  const routeParams = route.params as RouteParams;

  // Estado para armazenar os prestadores de serviço
  const [providers, setProviders] = useState<Provider[]>([]);
  // Estado para o prestador de serviços selecionado
  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId,
  );
  // Estado para exibição do calendário no Android
  const [showDatePicker, setShowDatePicker] = useState(false);
  // Estado para a data selecionada
  const [selectedDate, setSelectedDate] = useState(new Date());
  // Estado para o horário selecionado
  const [selectedHour, setSelectedHour] = useState(0);
  // Estado para as disponibilidades do prestador de serviço na data selecionada
  const [availability, setAvailability] = useState<Availability[]>([]);

  useEffect(() => {
    // Pegando os dados dos prestadores de serviço da API
    api.get('providers').then((response) => {
      // Salvando a resposta no estado de prestadores de serviço
      setProviders(response.data);
    });
  }, []);

  // Atualizando a disponibilidade do dia sempre que a data ou o prestador de serviço mudar
  useEffect(() => {
    // Pegando a disponibilidade do dia pela API
    api
      .get<Availability[]>(`providers/${selectedProvider}/day-availability`, {
        // Definindo os parâmetros para a chamada
        params: {
          year: selectedDate.getFullYear(),
          // Lembrando que o índice do mês no JavaScript começa em 0
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => {
        // Salvando a resposta no estado de disponibilidades
        setAvailability(response.data);
      });
  }, [selectedDate, selectedProvider]);

  // Função para navegar para a página anterior
  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  // Função para selecionar um prestador de serviços
  const handleSelectProvder = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  // Função para abrir/fechar a seleção de datas
  const handleToggleDatePicker = useCallback(() => {
    // Invertendo o estado atual
    setShowDatePicker((state) => !state);
    // Poderíamos fazer assim também. A forma acima retira a necessidade de adicionar as dependências ao callback
    // setShowDatePicker(!showDatePicker);
  }, []);

  // Função para lidar com a seleção de uma data
  const handleDateChange = useCallback(
    (event: Event, date: Date | undefined) => {
      // Para o Android
      if (Platform.OS === 'android') {
        // Fechamos o DatePicker
        setShowDatePicker(false);
      }
      // Atualizando a data selecionada (caso exista)
      if (date) setSelectedDate(date);
    },
    [],
  );

  // Função para selecionar um horário
  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  // Função para criar o agendamento
  const handleCreateAppointment = useCallback(async () => {
    try {
      // Criando a data a ser agendada a partir da data e horário selecionados
      const date = new Date(selectedDate);
      date.setHours(selectedHour);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);

      // Fazendo a chamada à API para criação do agendamneto
      await api.post('appointments', {
        provider_id: selectedProvider,
        date,
      });

      // Se der tudo certo, envia o usuário para a tela de sucesso/confirmação
      navigate('AppointmentCreated', { date: date.getTime() });
    } catch (err) {
      // Caso ocorra algum erro, informa ao usuário
      Alert.alert(
        'Erro ao criar agendamento',
        'Ocorreu um erro ao tentar criar o agendamento, tente novamente',
      );
    }
  }, [navigate, selectedDate, selectedHour, selectedProvider]);

  // Criando as variáveis para armazenar os horários da manhã e da tarde
  const morningAvailability = useMemo(() => {
    // Filtrando somente os horários antes de meio dia
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        // Retornando os dados com a hora formatada para apresentação
        return {
          hour,
          available,
          // Formatando a hora
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);
  const afternoonAvailability = useMemo(() => {
    // Filtrando somente os horários ao meio dia ou após esse horário
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        // Retornando os dados com a hora formatada para apresentação
        return {
          hour,
          available,
          // Formatando a hora
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>

      <Content>
        {/* Lista de prestadores de serviço */}
        <ProvidersListContainer>
          <ProvidersList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={providers}
            keyExtractor={(provider) => provider.id}
            renderItem={({ item: provider }) => (
              <ProviderContainer
                // Verificando se o prestador selecionado corresponde ao item
                selected={provider.id === selectedProvider}
                // Usamos o 'arrow function' pois precisamos passsar parâmetros para a função
                onPress={() => {
                  handleSelectProvder(provider.id);
                }}
              >
                <ProviderAvatar source={{ uri: provider.avatar_url }} />
                <ProviderName
                  // Verificando se o prestador selecionado corresponde ao item
                  selected={provider.id === selectedProvider}
                >
                  {provider.name}
                </ProviderName>
              </ProviderContainer>
            )}
            // Necessário adicionar essa parte para evitar que o último item seja cortado
            // No caso, usamos o dobro do 'margin-right' do 'ProviderContainer'
            contentContainerStyle={{ paddingRight: 32 }}
          />
        </ProvidersListContainer>

        {/* Criando o calendário para a seleção da data */}
        <Calendar>
          <Title>Escolha a data</Title>

          {/* Botão para abrir o DatePicker */}
          <OpenDatePickerButton onPress={handleToggleDatePicker}>
            <OpenDatePickerButtonText>
              Selecionar outra data
            </OpenDatePickerButtonText>
          </OpenDatePickerButton>

          {/* Apresentando o calendário somente quando selecionado (necessário para o Android) */}
          {showDatePicker && (
            <DateTimePicker
              // Definindo o modo de seleção como sendo apenas de data
              mode="date"
              // Selecionando o modal no estilo calendário para o Android
              display={Platform.OS === 'android' ? 'calendar' : 'spinner'}
              // Inicializando a data para o calendário
              value={selectedDate}
              // Definindo a cor do texto (para o iOS)
              {...(Platform.OS === 'ios' && { textColor: '#f4ede8' })}
              // Definindo a ação a ser tomada quando a data for selecionada
              onChange={handleDateChange}
            />
          )}
        </Calendar>

        {/* Apresentando os horários disponíveis no dia */}
        <Schedule>
          <Title> Escolha o horário</Title>

          <Section>
            <SectionTitle>Manhã</SectionTitle>
            <SectionContent>
              {morningAvailability.map(({ hourFormatted, available, hour }) => (
                <Hour
                  // Habilitando o botão somente se o horário estiver disponível
                  enabled={available}
                  available={available}
                  selected={selectedHour === hour}
                  key={hourFormatted}
                  onPress={() => {
                    handleSelectHour(hour);
                  }}
                >
                  <HourText selected={selectedHour === hour}>
                    {hourFormatted}
                  </HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>Tarde</SectionTitle>
            <SectionContent>
              {afternoonAvailability.map(
                ({ hourFormatted, available, hour }) => (
                  <Hour
                    // Habilitando o botão somente se o horário estiver disponível
                    enabled={available}
                    available={available}
                    selected={selectedHour === hour}
                    key={hourFormatted}
                    onPress={() => {
                      handleSelectHour(hour);
                    }}
                  >
                    <HourText selected={selectedHour === hour}>
                      {hourFormatted}
                    </HourText>
                  </Hour>
                ),
              )}
            </SectionContent>
          </Section>
        </Schedule>

        <CreateAppointmentButton onPress={handleCreateAppointment}>
          <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
        </CreateAppointmentButton>
      </Content>
    </Container>
  );
};

export default CreateAppointment;
