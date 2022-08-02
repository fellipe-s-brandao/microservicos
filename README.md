## Microserviços
### Funcionalidades
#### Back-end:
* NodeJs com o Framework NestJs
* PostgreSQL
* GraphQl
* Comunicação Utilizando o Apache Kafka
* Docker

#### Front-end:
* Next.js
* Apollo Client (GraphQL)

### Objetivo
* A aplicação consiste em criar dois back-ends independentes que se comunicam e um gatway que o client manda a requisição.
#### Exemplo:
* Um cliente executa uma compra, assim o back-end de compra comunica o back-end de sala de aula para criar a matrícula do cliente. Dessa forma, se um servidor ficar offline o outro continua funcionando e quando retonar executa as tarefas que ficaram na fila do Apache Kafka;
