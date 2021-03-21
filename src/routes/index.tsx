import React from 'react';
import { View, ActivityIndicator } from 'react-native';

// Importando as rotas de autenticação e da aplicação
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

// Importando o hook de autenticação
import { useAuth } from '../hooks/auth';

// Centralizando as rotas criadas para o aplicativo
const Routes: React.FC = () => {
    // Obtendo o usuário atualmente autenticado no sistema
    const { user, loading } = useAuth();

    // Verificando se está carregando o usuário
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color='#999' />
            </View>
        )
    }

    // Verificando se o usuário está logado ou não para definir quai sistema de rotas retornar
    return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
