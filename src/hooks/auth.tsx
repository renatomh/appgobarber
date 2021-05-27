import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

// Importando a comunicação com a API
import api from '../services/api';

// Criando a tipagem para o usuário
interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

// Criando a tipagem para o estado de autenticação
interface AuthState {
  token: string;
  user: User;
}

// Criando a tipagem para as credenciais a serem recebidas
interface SignInCredentials {
  email: string;
  password: string;
}

// Tipagem para o contexto de autenticação
interface AuthContextData {
  user: User;
  loading: boolean;
  // Definindo os métodos do contexto de autenticação
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): Promise<void>;
}

// Criando o contexto de autenticação do usuário e iniciando como vazio
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Criando o componente para o provedor de autenticação
const AuthProvider: React.FC = ({ children }) => {
  // Criando o estado para os dados do contexto de autenticação
  const [data, setData] = useState<AuthState>({} as AuthState);
  // Criando o estado para verificar se está carregando quando está sendo buscado o usuário no armazenamento
  const [loading, setLoading] = useState(true);

  // Disparando a função assim que o componente for exibido em tela
  useEffect(() => {
    // Criando uma função para carregar os dados do armazenamento (que é assíncrono)
    async function loadStoragedData(): Promise<void> {
      // Inicializando os dados com os valores armazendos localmente no dispositivo
      const [token, user] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user',
      ]);

      // Verificando se há dados armazenados no navegador
      // O 'multiGet' retorna a chave o valor dos dados
      if (token[1] && user[1]) {
        // Definindo ainda o cabeçalho padrão para as requisições com o token obtido
        api.defaults.headers.authorization = `Bearer ${token[1]}`;

        // Caso haja, setamos os dados para o estado
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }

      // Setando a flag 'loading' como falsa
      setLoading(false);
    }

    // Chamando a função para caregar os dados
    loadStoragedData();
  }, [data]);

  // Função para realizar o login na API
  const signIn = useCallback(async ({ email, password }) => {
    // Fazendo a chamada à API com os dados recebidos
    const response = await api.post('sessions', {
      email,
      password,
    });
    // Pegando os dados retornados na resposta da chamada à API
    const { token, user } = response.data;

    // Salvando os dados obtidos no armazenamento assíncrono do dispositivo
    await AsyncStorage.setItem('@GoBarber:token', token);
    await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user));
    // Podemos fazer com uma só função também
    // await AsyncStorage.multiSet([
    //   ['@GoBarber:token', token],
    //   ['@GoBarber:user', JSON.stringify(user)]
    // ]);

    // Definindo ainda o cabeçalho padrão para as requisições com o token obtido
    api.defaults.headers.authorization = `Bearer ${token}`;

    // Armazenando os dados no estado do contexto da aplicação
    setData({ token, user });
  }, []);

  // Função para realizar o logout
  const signOut = useCallback(async () => {
    // Removendo os dados salvos no armazenamento assíncrono do dispositivo
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);

    // Atualizando o estado do contexto de autenticação
    setData({} as AuthState);
  }, []);

  // Função para a atualização do usuário
  // Poderíamos receber apenas alguns parâmetros do tipo 'User' por meio de um tipo 'Partial<User>'
  const updateUser = useCallback(
    async (user: User) => {
      // Salvando os dados obtidos no armazenamento local do navegador
      await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user));

      // Atualizando os dados do usuário autenticado
      setData({
        // Mantendo o token
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    // Exportando as propriedades e funções do contexto
    <AuthContext.Provider
      value={{ user: data.user, loading, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Definindo a função para utilizar o contexto de autenticação
function useAuth(): AuthContextData {
  // Definindo o contexto a ser utilizado
  const context = useContext(AuthContext);
  // Verificando se o contexto ainda não foi criado
  if (!context) {
    // Caso não tenha sido criado, informa o erro (deve ser utilizado no App.tsx)
    throw new Error('useAuth must be used within an AuthProvider');
  }
  // Caso contrário, retorna o contexto
  return context;
}

export { AuthProvider, useAuth };
