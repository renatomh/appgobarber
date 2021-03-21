import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';

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
    </App.Navigator>
);

export default AuthRoutes;
