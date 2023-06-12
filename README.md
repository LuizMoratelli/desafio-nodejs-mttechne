# Desafio NodeJs Mttechne

## Subindo a aplicação

1. Baixar/Copiar o reposítorio;
2. Executar o comando do docker:

```sh
docker-compose build && docker-compose up -d
```

3. É possível executar a cobertura dos testes unitários ao entrar no diretório de um dos serviços e executando o seguinte comando:

```sh
// cd cash-flow-control ou cd consolidated-daily
npm run test:ci
```

## Utilização dos Serviços

1. Importação da coleção do Insomnia (`./Insomnia-teste-nodejs-mttechne.json`);
2. Caso necessário, Criação de um Environment no Insomnia:

```
{
	"cash-flow-control": "http://localhost:3001",
	"consolidated-daily": "http://localhost:3002"
}
```

3. Atrás da rota `Add Financial Release` é possível cadastrar quantos lançamentos forem desejados.
4. Esses lançamentos podem ser: Listados (`Get All Financial Release` | `Get Financial Release`); Editados (`Update Financial Release`); Removidos (`Delete Financial Release`);
5. É possível obter um relatório do saldo diário consolidado através da rota `Get Report`.

## Desenho da Solução

![Arquitetura de Solução](./architecture.png 'Arquitetura de Solução')

## Explicação não Técnica

A arquitetura consiste em um banco de dados e dois serviços:

- cash-flow-control: efetua o registro dos lançamentos no banco de dados, assim como alterações e exclusões;
- consolidated-daily: utiliza os lançamentos registrados para geração de um relatório simples de saldo consolidado diario.

Os serviços foram construídos utilizando clean architecture - focando em camadas bem isoladas, reduzindo o acoplamento visando a evolução futura do projeto - e TDD - pensando na criação dos testes unitários mesmo antes da implementação das funcionalidades - para garantir um melhor e mais seguro funcionamento no geral.

Dessa forma cada serviço é focado em um escopo bem definido, facilitando manutenções, mudanças e melhorias futuras.

## Cobertura de Testes

### Cash Flow Control

```
----------------------------------------------------|---------|----------|---------|---------|-------------------
File                                                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------------------------------------------------|---------|----------|---------|---------|-------------------
All files                                           |     100 |      100 |     100 |     100 |
 data/usecases/add-financial-release                |     100 |      100 |     100 |     100 |
  db-add-financial-release.ts                       |     100 |      100 |     100 |     100 |
 data/usecases/delete-financial-release             |     100 |      100 |     100 |     100 |
  db-delete-financial-release.ts                    |     100 |      100 |     100 |     100 |
 data/usecases/get-all-financial-release            |     100 |      100 |     100 |     100 |
  db-get-all-financial-release.ts                   |     100 |      100 |     100 |     100 |
 data/usecases/get-financial-release                |     100 |      100 |     100 |     100 |
  db-get-financial-release.ts                       |     100 |      100 |     100 |     100 |
 data/usecases/update-financial-release             |     100 |      100 |     100 |     100 |
  db-update-financial-release.ts                    |     100 |      100 |     100 |     100 |
 infra/db/mongodb/financial-release-repository      |     100 |      100 |     100 |     100 |
  financial-release.ts                              |     100 |      100 |     100 |     100 |
 infra/db/mongodb/helpers                           |     100 |      100 |     100 |     100 |
  mongodb-helper.ts                                 |     100 |      100 |     100 |     100 |
 infra/validation/class-validator                   |     100 |      100 |     100 |     100 |
  dto-validator.ts                                  |     100 |      100 |     100 |     100 |
  index.ts                                          |     100 |      100 |     100 |     100 |
  validator.ts                                      |     100 |      100 |     100 |     100 |
 presentation/adapters                              |     100 |      100 |     100 |     100 |
  class-validator-adapter.ts                        |     100 |      100 |     100 |     100 |
 presentation/controllers/add-financial-release     |     100 |      100 |     100 |     100 |
  add-financial-release.ts                          |     100 |      100 |     100 |     100 |
 presentation/controllers/delete-financial-release  |     100 |      100 |     100 |     100 |
  delete-financial-release.ts                       |     100 |      100 |     100 |     100 |
 presentation/controllers/get-all-financial-release |     100 |      100 |     100 |     100 |
  get-all-financial-release.ts                      |     100 |      100 |     100 |     100 |
 presentation/controllers/get-financial-release     |     100 |      100 |     100 |     100 |
  get-financial-release.ts                          |     100 |      100 |     100 |     100 |
 presentation/controllers/update-financial-release  |     100 |      100 |     100 |     100 |
  update-financial-release.ts                       |     100 |      100 |     100 |     100 |
 presentation/errors                                |     100 |      100 |     100 |     100 |
  index.ts                                          |     100 |      100 |     100 |     100 |
  not-found.ts                                      |     100 |      100 |     100 |     100 |
  server.ts                                         |     100 |      100 |     100 |     100 |
 presentation/helpers                               |     100 |      100 |     100 |     100 |
  http.ts                                           |     100 |      100 |     100 |     100 |
 presentation/validation                            |     100 |      100 |     100 |     100 |
  add-financial-release.ts                          |     100 |      100 |     100 |     100 |
  delete-financial-release.ts                       |     100 |      100 |     100 |     100 |
  get-financial-release.ts                          |     100 |      100 |     100 |     100 |
  update-financial-release.ts                       |     100 |      100 |     100 |     100 |
----------------------------------------------------|---------|----------|---------|---------|-------------------
```

### Consolidated Daily

```
---------------------------------------------------|---------|----------|---------|---------|-------------------
File                                               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
---------------------------------------------------|---------|----------|---------|---------|-------------------
All files                                          |     100 |      100 |     100 |     100 |
 data/usecases/report-financial-release            |     100 |      100 |     100 |     100 |
  db-report-financial-release.ts                   |     100 |      100 |     100 |     100 |
 infra/db/mongodb/financial-release-repository     |     100 |      100 |     100 |     100 |
  financial-release.ts                             |     100 |      100 |     100 |     100 |
 infra/db/mongodb/helpers                          |     100 |      100 |     100 |     100 |
  mongodb-helper.ts                                |     100 |      100 |     100 |     100 |
 presentation/controllers/report-financial-release |     100 |      100 |     100 |     100 |
  report-financial-release.ts                      |     100 |      100 |     100 |     100 |
 presentation/errors                               |     100 |      100 |     100 |     100 |
  index.ts                                         |     100 |      100 |     100 |     100 |
  server.ts                                        |     100 |      100 |     100 |     100 |
 presentation/helpers                              |     100 |      100 |     100 |     100 |
  http.ts                                          |     100 |      100 |     100 |     100 |
---------------------------------------------------|---------|----------|---------|---------|-------------------
```
