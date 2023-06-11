# Desafio NodeJs Mttechne

## Subindo a aplicação

1. Baixar/Copiar o reposítorio;
2. Executar o comando do docker:

```ssh
docker-compose build && docker-compose up -d
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

## Explicação Não-Técnica

A arquitetura consiste de um banco de dados não relacional MongoDB e 2 serviços:

- cash-flow-control: efetua o registro dos lançamentos no banco de dados, assim como alterações e exclusões;
- consolidated-daily: utiliza os lançamentos registrados para geração de um relatório simples de saldo consolidado diario.
