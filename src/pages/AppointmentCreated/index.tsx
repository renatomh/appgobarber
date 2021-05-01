import React, { useCallback, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/core';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import {
    Container,
    Title,
    Description,
    OkButton,
    OkButtonText,
} from './styles';

// Tipagem para os parâmetros recebidos via navegação
interface RouteParams {
    date: number;
}

const AppointmentCreated: React.FC = () => {
    // Definindo o navegador para as rotas
    const { reset } = useNavigation();

    // Pegando os dados passados na navegação para as páginas
    const { params } = useRoute();
    const routeParams = params as RouteParams;

    // Definindo a data formatada
    const formattedDate = useMemo(() => {
        return format(
            routeParams.date,
            "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'",
            { locale: ptBR }
        );
    }, [routeParams.date]);

    // Função para navegar para outra tela ao clicar no botão
    const handleOkPressed = useCallback(() => {
        // Navegando para a tela principal e impedindo o usuário de "voltar" para a tela anterior
        reset({
            // Definindo as rotas que ainda poodem ser acessadas com o "voltar"
            routes: [
                { name: 'Dashboard' }
            ],
            // Definindo a tela para a qual navegar, entre as passadas nas rotas
            index: 0,
        });
    }, [reset]);

    return (
        <Container>
            <Icon name="check" size={80} color="#40D361" />

            <Title>Agendamento concluído</Title>
            <Description>{formattedDate}</Description>

            <OkButton onPress={handleOkPressed}>
                <OkButtonText>Ok</OkButtonText>
            </OkButton>
        </Container>
    );
};

export default AppointmentCreated;
