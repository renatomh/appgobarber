import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import CreateAppointment from '../pages/CreateAppointment';
import AppointmentCreated from '../pages/AppointmentCreated';

const App = createStackNavigator();

// Rotas da aplicação para o usuário já autenticado
const AuthRoutes: React.FC = () => (
  // Criando o navegador de telas
  <App.Navigator
    screenOptions={{
      // Escondendo o header
      headerShown: false,
      // Caso quiséssemos definir uma estilização para o header
      // headerTintColor: '#fff',
      // headerStyle: {backgroundColor: '#7159c1',},
      // Definindo a cor de fundo como o padrão do aplicativo
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="CreateAppointment" component={CreateAppointment} />
    <App.Screen name="AppointmentCreated" component={AppointmentCreated} />

    <App.Screen name="Profile" component={Profile} />
  </App.Navigator>
);

export default AuthRoutes;
