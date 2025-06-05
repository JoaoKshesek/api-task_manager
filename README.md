# API - Task Manager

Aplicativo feito em Express

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

Consulte **Instalação e configuração** para saber como implantar o projeto.

### 📋 Pré-requisitos

De que coisas você precisa para instalar o software e como instalá-lo?

```
NodeJS (18 ou superior)
Docker (Apenas desenvolvimento)
```

### 🔧 Instalação e configuração

Uma série de exemplos passo-a-passo que informam o que você deve executar para ter um ambiente de desenvolvimento em execução.

Altere as configurações no `.env` antes de continuar com os passos da instalação. Caso ele não exista copie o arquivo `.env.example` para `.env`

Um valor seguro para JWT_SECRET deve ser gerado e inserido no arquivo `.env`. Você pode gerar esse segredo utilizando o site [JwtSecret.com](https://jwtsecret.com/generate).

#### Instalar dependências

```bash
$ npm install
```

#### Inicialização da aplicação

1. Subir containers (Apenas local)

```bash
$ docker-compose up -d --build
```

## 📦 Desenvolvimento

Conecte-se à aplicação por meio da URL: http://localhost:3333
