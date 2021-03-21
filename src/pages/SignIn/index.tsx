import React, { useCallback, useRef } from 'react';
import {
    Image,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErrors';

// Importando os componentes criados
import Input from '../../components/Input';
import Button from '../../components/Button';

// Importando a logo do aplicativo
// ele carrega automaticamente o tamanho ideal (normal, @2x, @3x)
import logoImg from '../../assets/logo.png';

import {
    Container,
    Title,
    ForgotPassword,
    ForgotPasswordText,
    CreateAccountButton,
    CreateAccountButtonText
} from './styles';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    // Definindo a referência para manipular os dados e elementos do formulário
    const formRef = useRef<FormHandles>(null);
    // Criando a ref para a senha
    const passwordInputRef = useRef<TextInput>(null);

    // Criando o sistema de navegaçõa entre as telas do aplicativo
    const navigation = useNavigation();

    // Importando o método de SignIn do hook de contexto
    const { signIn } = useAuth();

    // Função para lidar com o submit do formulário
    const handleSignIn = useCallback(
        async (data: SignInFormData) => {
            try {
                // Zerando os erros que possam advir de preenchimentos de inputs passados
                formRef.current?.setErrors({});

                // Definindo o schema de validação
                const schema = Yup.object().shape({
                    email: Yup.string()
                        .email('Digite um e-mail válido')
                        .required('E-mail obrigatório'),
                    password: Yup.string().required('Senha obrigatória'),
                });

                // Validando os dados de acordo com o schema criado
                await schema.validate(data, {
                    // Aqui definimos que todos os erros encontrados serão retornados
                    abortEarly: false,
                });

                // Chamando a função para fazer o log in no sistema
                await signIn({
                    email: data.email,
                    password: data.password,
                });
            } catch (err) {
                // Caso ocorra algum erro, verificamos se foi na validação dos dados
                if (err instanceof Yup.ValidationError) {
                    // Obtendo os erros de validação retornados
                    const errors = getValidationErrors(err);
                    console.log(errors);
                    // Definindo os erros no formRef
                    formRef.current?.setErrors(errors);
                    return;
                }

                // Caso não tenha sido, criamos um alerta para informar ao usuário
                // Recebe o título, a descrição
                Alert.alert(
                    'Erro na autenticação',
                    'Ocorreu um erro ao fazer login, verifique as credenciais.',
                )
            }
        },
        [signIn],
    );

    return (
        <>
            {/* Evitando que o teclado esconda a tela no iOS */}
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS == 'ios' ? 'padding' : undefined}
                enabled>
                {/* View para rolar a tela caso seja pequena ou quando há muitos elementos */}
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flexGrow: 1 }}>
                    <Container>
                        <Image source={logoImg} />

                        {/* Corrigindo a animação para o texto quando o teclado aparece no iOS */}
                        <View>
                            <Title>Faça seu logon</Title>
                        </View>

                        {/* Formulário para envio de dados */}
                        <Form ref={formRef} onSubmit={handleSignIn}>
                            <Input
                                autoCorrect={false}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                name="email"
                                icon="mail"
                                placeholder="E-mail"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    passwordInputRef.current?.focus();
                                }}
                            />

                            <Input
                                ref={passwordInputRef}
                                name="password"
                                icon="lock"
                                placeholder="Senha"
                                secureTextEntry
                                returnKeyType="send"
                                onSubmitEditing={() => {
                                    formRef.current?.submitForm();
                                }}
                            />
                        </Form>
                        {/* Está perdendo a formatação quando fica dentro de form */}
                        <Button onPress={() => { formRef.current?.submitForm(); }}>
                            Entrar
                        </Button>

                        <ForgotPassword onPress={() => { }}>
                            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
                        </ForgotPassword>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Botão para ir para a tela de cadastro */}
            <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
                <Icon name="log-in" size={20} color="#ff9000" />
                <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
            </CreateAccountButton>
        </>
    );
};

export default SignIn;
