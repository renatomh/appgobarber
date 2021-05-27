import React, { useRef, useCallback } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
// A versão sendo utilizada é a 2.3.3, pois a nova versão mudou bem os métodos
import ImagePicker from 'react-native-image-picker';

// Pegando o contexto de autenticação
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErrors';

// Importando os componentes criados
import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  BackButton,
  UserAvatarButton,
  UserAvatar,
} from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  // Pegando os dados e métodos para o usuário logado
  const { user, updateUser } = useAuth();

  // Definindo a referência para manipular os dados e elementos do formulário
  const formRef = useRef<FormHandles>(null);
  // Referências para os campos de e-mail e senha
  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  // Criando o sistema de navegação entre as telas do aplicativo
  const navigation = useNavigation();

  // Função para lidar com a validação dos dados do formulário
  const handleUpdateProfile = useCallback(
    async (data: ProfileFormData) => {
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
          // Definindo o tipo como string
          old_password: Yup.string(),
          // Só precisará informar uma nova senha caso a atual tenha sido informada
          password: Yup.string().when('old_password', {
            is: (val: any) => !!val.length,
            // O tamanho mínimo será 6 dígitos (logo, é obrigatório)
            then: Yup.string().min(6, 'No mínimo 6 dígitos'),
            otherwise: Yup.string(),
          }),
          // A confirmação de senha deve ser igual à nova senha definida
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val: any) => !!val.length,
              // O tamanho mínimo será 6 dígitos (logo, é obrigatório)
              then: Yup.string().min(6, 'No mínimo 6 dígitos'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password')], 'As senhas não coincidem'),
        });

        // Validando os dados de acordo com o schema criado
        await schema.validate(data, {
          // Aqui definimos que todos os erros encontrados serão retornados
          abortEarly: false,
        });

        // Pegando somente os dados do formulário que foram preenchidos
        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;
        const formData = {
          name,
          email,
          // Caso tenha sido passada a senha atual
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        // Fazendo a chamada à API para a atualização do perfil de usuário
        const response = await api.put('/profile', formData);
        // Atualizando o usuário no 'hook' de autenticação
        updateUser(response.data);

        // Avisando o usuário sbre o sucesso
        Alert.alert('Perfil atualizado com sucesso!');

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
        // Recebe o título e a descrição
        Alert.alert(
          'Erro na atualização do perfil',
          'Ocorreu um erro ao atualizar seu perfil, tente novamente.',
        );
      }
    },
    [navigation, updateUser],
  );

  // Função para atualização do avatar do usuário
  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecione um avatar',
        cancelButtonTitle: 'Cancelar',
        takePhotoButtonTitle: 'Tirar uma foto',
        chooseFromLibraryButtonTitle: 'Escolher da galeria',
        // Definindo a qualidade da imagem para reduzir o tamanho da mesma
        quality: 0.5,
      },
      (response) => {
        if (response.didCancel) {
          return;
        }
        if (response.error) {
          Alert.alert('Erro ao atualizar seu avatar.');
          console.log('ImagePicker Error: ', response.error);
        }

        // Criando o formulário com o arquivo a ser enviado para a API
        const data = new FormData();
        data.append('avatar', {
          type: 'image/jpeg',
          name: `${user.id}.jpg`,
          // Pegando a imagem selecionada
          uri: response.uri,
        });

        // Fazendo a chamada à API
        api.patch('/users/avatar', data).then((apiResponse) => {
          updateUser(apiResponse.data);
        });
      },
    );
  }, [updateUser, user.id]);

  // Função para voltar para a tela anterior
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

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
            <BackButton onPress={handleGoBack}>
              <Icon name="chevron-left" size={24} color="#999591" />
            </BackButton>
            <UserAvatarButton onPress={handleUpdateAvatar}>
              <UserAvatar source={{ uri: user.avatar_url }} />
            </UserAvatarButton>

            {/* Corrigindo a animação para o texto quando o teclado aparece no iOS */}
            <View>
              <Title>Meu perfil</Title>
            </View>

            <Form
              // Defiindo os dados iniciais para o formulário
              // Podemos fazer assim
              // initialData={{ name: user.name, email: user.email }}
              // Ou assim, que ele já reconhece s campos e preenche
              initialData={user}
              ref={formRef}
              onSubmit={handleUpdateProfile}
            >
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
                  oldPasswordInputRef.current?.focus();
                }}
              />

              <Input
                ref={oldPasswordInputRef}
                secureTextEntry
                name="old_password"
                icon="lock"
                placeholder="Senha atual"
                textContentType="newPassword"
                returnKeyType="next"
                // Adicionando um pequeno espaçamento para a área de senha
                containerStyle={{ marginTop: 16 }}
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Nova senha"
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => {
                  confirmPasswordInputRef.current?.focus();
                }}
              />

              <Input
                ref={confirmPasswordInputRef}
                secureTextEntry
                name="password_confirmation"
                icon="lock"
                placeholder="Confirmar senha"
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
              Confirmar mudanças
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Profile;
