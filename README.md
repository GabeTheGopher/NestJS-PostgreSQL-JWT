# NestJS - PostgreSQL - JWT 🚀

Este projeto demonstra na prática uma API desenvolvida em NestJS utilizando o banco de dados PostgreSQL, a partir do ORM TypeORM. O projeto também utiliza JWT (JSON Web Tokens) para autenticação, o objetivo dessas escolhas foi construir uma API segura e principalmente escalável.

## Tecnologias Utilizadas 💻

- **NestJS**: Framework para construção de aplicações Node.js eficientes e escaláveis.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenamento de dados.
- **TypeORM**: Biblioteca de ORM (Object-Relational Mapping) para conectar e manipular o PostgreSQL.
- **JWT**: Mecanismo de autenticação baseado em tokens para garantir a segurança da API.
- **Docker**: Plataforma de gerenciamento de containers.
- **Swagger**: Documentação da API.
  
## Requisitos 📝

- Node.js
- Docker

## Como utilizar 🧠

Primeiramente, é necessário instalar as dependências do projeto:

```bash
  npm install
```

Também é necessário configurar as variáveis de ambiente que estão no arquivo "env.example", é necessário alterar para ".env". Importante salientar que as variáveis refentes ao PostgreSQL devem coincidir com as informações do arquivo "docker-compose.yml".

Inicie o banco de dados:

```bash
  docker compose up -d
```

Executar as migrations:

```bash
  npm run migration:run
```

Inicie o servidor local:

```bash
  npm run start:dev
```

Após a execução desses passos, a API estará disponível para ser utilizada em http://localhost:3000/api.

## Licença ☕

Este projeto está licenciado sob a [**MIT License**](https://github.com/GabeTheGopher/NestJS-PostgreSQL-JWT/blob/master/LICENSE).
