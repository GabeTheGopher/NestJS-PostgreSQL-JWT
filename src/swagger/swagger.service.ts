import { Injectable } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';

@Injectable()
export class SwaggerService {
  getDocumentBuilder() {
    return new DocumentBuilder()
      .setTitle('API Nest com JWT')
      .setDescription(
        'Projeto desenvolvido em NestJS com o objetivo de criar um CRUD, nesse ' +
          'caso um de tarefas, onde antes de acessar o crud é necessário fazer um ' +
          'login que possui bearer authentication.',
      )
      .setVersion('1.0')
      .addTag('Users', 'Realize o login para obter o código JWT')
      .addTag('Tasks', 'Após realizar o login, você poderá manipular tasks')
      .addBearerAuth()
      .build();
  }
}
