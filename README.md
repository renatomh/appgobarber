# GoBarber - *Aplicativo Mobile*

## 💡 Ideia do projeto

Projeto desenvolvido durante o bootcamp *GoStack* da Rocketseat, com os módulos de aplicativos mobile com *React Native*.

## 🔍 Funcionalidades

* Realização de login em uma conta já existente na plataforma ou cadastro de um novo usuário;
* Listagem dos prestadores de serviço cadatrados no sistema;
* Verificação da disponibilidade de atendimento dos prestadores de serviços;
* Criação de um novo agendamento para um dos prestadores de serviço em um horário disponível;
* Atualização do perfil do usuário e avatar;

## 💹 Extras

* 
* 

## 🛠 Tecnologias Utilizadas

Para o desenvolvimento desse projeto, as seguintes tecnologias foram utilizadas:

- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## 💻 Configuração do Projeto

### Primeiramente, clone o repositório para obter uma cópia do código em sua máquina local

```bash
$ git clone ... && cd ...
```

### Instale as dependências (comando para o yarn)

```bash
$ yarn
```

## 🌐 Atualização dos arquivos de configuração

É necessário atualizar o arquivo com o código da API (*./src/services/api.ts*) de acordo com o endereço URL base para a API sendo utilizada no *backend* da aplicação:

```typescript
import axios from 'axios';

const api = axios.create({
    // Modificar de acordo com o endereço do servidor/dispositivo utilizado (emulador Android, iOS, etc.)
    baseURL: "http://10.0.2.2:3333",
})

export default api;

```

## ⏯️ Executando o projeto

Para a execução do projeto em ambiente de desenvolvimento, basta executar o comando abaixo na pasta raiz do projeto:

```bash
$ # Para dispositivos Android
$ yarn android
$ # Para dispositivos iOS
$ yarn ios
```

## 🔨 *Build* do projeto para Publicação

Para a publicação do aplicativo nas lojas de cada tipo de dispositivo (Play Store ou App Store) há diferentes passos a serem tomados

```bash
$ 
```

### Documentação:
* [Publishing to Google Play Store](https://reactnative.dev/docs/signed-apk-android)
* [Publishing to Apple App Store](https://reactnative.dev/docs/publishing-to-app-store)

## 📄 Licença

Esse projeto está sob a licença ...
