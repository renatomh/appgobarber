// É necessário a importação dessa biblioteca no primeiro arquivo da aplicação
import 'react-native-gesture-handler';

import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// Pegando os contextos criados para a aplicação
import AppProvider from './hooks';

import Routes from './routes/index';

// Criando o componente principal para o App
const App: React.FC = () => (
  <NavigationContainer>
    {/* Definindo a StatusBar da aplicação */}
    <StatusBar barStyle="light-content" backgroundColor="#312e38" />
    {/* Definindo o contexto da aplicação */}
    <AppProvider>
      {/* Definindo a tela principal da aplicação */}
      <View style={{ flex: 1, backgroundColor: '#312e38' }}>
        <Routes />
      </View>
    </AppProvider>
  </NavigationContainer>
)

export default App;
