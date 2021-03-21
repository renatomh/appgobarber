import React from 'react';
import { View, Button } from 'react-native';

// Pegando o contexto de autenticação
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
    // Pegando o método para sair do aplicativo
    const { signOut } = useAuth();

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Button title="Sair" onPress={signOut} />
        </View>
    );
};

export default Dashboard;
