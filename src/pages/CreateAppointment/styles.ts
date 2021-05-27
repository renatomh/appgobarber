import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RectButton } from 'react-native-gesture-handler';

/* Pegando a tipagem para os prestadores de serviço */
import { Provider } from './index';

/* Tipagem para receber o estado do provider como selecionado ou não */
interface ProviderContainerProps {
  selected: boolean;
}

interface ProviderNameProps {
  selected: boolean;
}

interface HourProps {
  available: boolean;
  selected: boolean;
}

interface HourTextProps {
  selected: boolean;
}

/* Estilizando o container */
export const Container = styled.SafeAreaView`
  flex: 1;
`;

/* Estilizando o cabeçalho */
export const Header = styled.View`
  padding: 24px;
  /* Definindo o espaçamento da barra de notficações */
  padding-top: ${getStatusBarHeight() + 24}px;
  background: #28262e;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

/* Estilizando o botão para voltar para página anterior */
export const BackButton = styled.TouchableOpacity``;

/* Estilizando o título do cabeçalho */
export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  margin-left: 16px;
`;

/* Estilizando a imagem de perfil do usuário */
export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  /* Para a imagem ficar redonda, colocamos como raio da borda metade do tamanho da mesma */
  border-radius: 28px;
  /* Colocando o resto do conteúdo todo para a esquerda do cabeçalho, ao tornar a margem
    esquerda da imagem a máxima disponível */
  margin-left: auto;
`;

/* Estilização da página */
export const Content = styled.ScrollView``;

/* Container para a lista de providers */
export const ProvidersListContainer = styled.View`
  height: 112px;
`;

/* Estilizando a lsita de prestadores de serviço */
/* Aqui temos de fazer essa gambiarra para estilizar os itens da lista */
export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px;
`;

/* Botão para o item do provider */
/* Definimos a tipagem para receber as propriedades personalizadas */
export const ProviderContainer = styled(RectButton)<ProviderContainerProps>`
  /* Definindo a cor de fundo de acordo com a seleção do provider */
  background: ${(props) => (props.selected ? '#FF9000' : '#3E3B47')};
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  margin-right: 16px;
  border-radius: 10px;
`;

/* Container para o avatar do provider */
export const ProviderAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

/* Container para o nome do provider */
/* Definimos a tipagem para receber as propriedades personalizadas */
export const ProviderName = styled.Text<ProviderNameProps>`
  margin-left: 8px;
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  /* Definindo a cor do texto de acordo com a seleção do provider */
  color: ${(props) => (props.selected ? '#232129' : '#F4EDE8')};
`;

/* Container para o calendário */
export const Calendar = styled.View``;

/* Título para o calendário e outors itens */
export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
  font-size: 24px;
  /* Margem: 0 em cima, 24 nas laterais e 24 embaixo */
  margin: 0 24px 24px;
`;

/* Botão para abrir o calendário */
export const OpenDatePickerButton = styled(RectButton)`
  height: 46px;
  background: #ff9000;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px;
`;

/* Texto do botão para abrir o calendário */
export const OpenDatePickerButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: #232129;
`;

/* Área dos horários */
export const Schedule = styled.View`
  padding: 24px 0 16px;
`;

/* Seção dos horários */
export const Section = styled.View`
  margin-bottom: 24px;
`;

/* Tìtuleo da seção para os horários */
export const SectionTitle = styled.Text`
  color: #999591;
  font-family: 'RobotoSlab-Regular';
  margin: 0 24px 12px;
`;

/* Conteúdo da seção de horários */
/* Passando propriedades como se tivesse sendo passado no 'tsx' */
export const SectionContent = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: 24 },
  /* Definindo a orientação como sendo horizontal */
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

/* Botão para seleção do oorário */
export const Hour = styled(RectButton)<HourProps>`
  padding: 12px;
  /* Diferenciando o horário selecioando dos demais */
  background: ${(props) => (props.selected ? '#FF9000' : '#3E3B47')};
  border-radius: 10px;
  margin-right: 8px;
  /* Diferenciando os horários que não estão disponíveis */
  opacity: ${(props) => (props.available ? 1 : 0.3)};
`;

/* Texto para o horário */
export const HourText = styled.Text<HourTextProps>`
  color: ${(props) => (props.selected ? '#232129' : '#F4EDE8')};
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
`;

/* Botão para agendar */
export const CreateAppointmentButton = styled(RectButton)`
  height: 50px;
  background: #ff9000;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px 24px;
`;

/* Texto para o botão de agendar */
export const CreateAppointmentButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #232129;
`;
