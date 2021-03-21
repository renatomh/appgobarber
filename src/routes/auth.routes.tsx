import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
    // Criando o navegador de telas
    <Auth.Navigator
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
        <Auth.Screen name="SignIn" component={SignIn} />
        <Auth.Screen name="SignUp" component={SignUp} />
    </Auth.Navigator>
);

export default AuthRoutes;
