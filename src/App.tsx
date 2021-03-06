// É necessário a importação dessa biblioteca no primeiro arquivo da aplicação
import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

// Pegando os contextos criados para a aplicação
import AppProvider from './hooks';

import Routes from './routes/index';

// Criando o componente principal para o App
const App: React.FC = () => {
  useEffect(() => {
    // Aqui podemos verificar se já há um token válido para o usuário, entre outras coisas
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      {/* Definindo a StatusBar da aplicação */}
      <StatusBar
        barStyle="light-content"
        backgroundColor="#312e38"
        // Essa opção faz com que o Android não conte a barra de notificações como tamanho do conteúdo
        // Fazemos isso para evitar ter de usar o código abaixo nos cabeçalhos das páginas
        // padding-top: ${Platform.OS === 'ios' ? getStatusBarHeight() + 24 : 24}px;
        translucent
      />
      {/* Definindo o contexto da aplicação */}
      <AppProvider>
        {/* Definindo a tela principal da aplicação */}
        <View style={{ flex: 1, backgroundColor: '#312e38' }}>
          <Routes />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
