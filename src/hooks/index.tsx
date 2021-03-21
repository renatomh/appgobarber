import React from 'react';

// Importando o contexto de autenticação
import { AuthProvider } from './auth';

// Centralizando/englobando os contextos/hooks criados para a aplicação
const AppProvider: React.FC = ({ children }) => {
    return (
        // Criando o contexto de autenticação
        <AuthProvider>{children}</AuthProvider>
    );
};

export default AppProvider;
