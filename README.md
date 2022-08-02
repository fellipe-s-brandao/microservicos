## Microserviços
### Funcionalidades
#### Back-end:
* NodeJs com o Framework NestJs
* Prisma
* PostgreSQL
* GraphQl
* Comunicação Utilizando o Apache Kafka
* Docker

#### Front-end:
* Next.js
* Apollo Client (GraphQL)

### Objetivo
* A aplicação consiste em criar dois back-ends independentes que se comunicam e um gatway que o client manda a requisição.
#### Explicação:
* Um cliente executa uma compra, assim o back-end de compra comunica o back-end de sala de aula para criar a matrícula do cliente. Dessa forma, se um servidor ficar offline o outro continua funcionando e quando retonar executa as tarefas que ficaram na fila do Apache Kafka.
<img src="https://github.com/fellipe-s-brandao/microservicos/blob/master/img/Captura%20de%20tela%202022-07-20%20235800.png">

## Front
<img style="width: 800px" src="https://github.com/fellipe-s-brandao/microservicos/blob/master/img/Captura%20de%20tela%202022-07-21%20000439.png">
<img style="width: 800px" src="https://github.com/fellipe-s-brandao/microservicos/blob/master/img/Captura%20de%20tela%202022-07-21%20000551.png">
