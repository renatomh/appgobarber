import React, { useRef, useCallback } from 'react';
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
import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

// Importando os componentes criados
import Input from '../../components/Input';
import Button from '../../components/Button';

// Importando a logo do aplicativo
// ele carrega automaticamente o tamanho ideal (normal, @2x, @3x)
import logoImg from '../../assets/logo.png';

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  // Definindo a referência para manipular os dados e elementos do formulário
  const formRef = useRef<FormHandles>(null);
  // Referências para os campos de e-mail e senha
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  // Criando o sistema de navegação entre as telas do aplicativo
  const navigation = useNavigation();

  // Função para lidar com a validação dos dados do formulário
  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        // Zerando os erros que possam advir de preenchimentos de inputs passados
        formRef.current?.setErrors({});

        // Definindo o schema de validação
        const schema = Yup.object().shape({
          // Definindo o tipo como string e definindo que é obrigatório
          name: Yup.string().required('Nome obrigatório'),
          // Definindo o tipo como string de e-mail e definindo que é obrigatório
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          // Definindo o tipo como string e o tamanho mínimo como 6 dígitos (logo, é obrigatório)
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });

        // Validando os dados de acordo com o schema criado
        await schema.validate(data, {
          // Aqui definimos que todos os erros encontrados serão retornados
          abortEarly: false,
        });

        // Fazendo a chamada à API para o cadastro dos usuários
        await api.post('/users', data);

        // Avisando o usuário sbre o sucesso no cadastro
        Alert.alert(
          'Cadastro realizado com sucesso!',
          'Você já pode fazer login na aplicação.',
        );

        // Voltando para a tela inicial
        // navigation.navigate('SignIn');
        navigation.goBack();
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
          'Erro no cadastro',
          'Ocorreu um erro ao fazer cadastro, tente novamente.',
        );
      }
    },
    [navigation],
  );

  return (
    <>
      {/* Evitando que o teclado esconda a tela no iOS */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        {/* View para rolar a tela caso seja pequena ou quando há muitos elementos */}
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Container>
            <Image source={logoImg} />

            {/* Corrigindo a animação para o texto quando o teclado aparece no iOS */}
            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />

              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
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
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
            </Form>
            {/* Está perdendo a formatação quando fica dentro de form */}
            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Cadastrar
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Botão para voltar para a tela de logon */}
      <BackToSignIn onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInText>Voltar para logon</BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default SignUp;
