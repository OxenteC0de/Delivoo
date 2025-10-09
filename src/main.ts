import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Delivoo API')
    .setDescription('Documentação da API do projeto Delivoo (Delivery System)')
    .setContact(
      'Equipe Oxente Code',                    
      'https://www.oxentecode.com.br',        
      'ti@delivoo.com.br'                     
    )
    .setVersion('1.0')
    .addBearerAuth() 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document); // rota: http://localhost:4000/swagger

  // Configurações globais da aplicação
  process.env.TZ = '-03:00';
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(process.env.PORT ?? 4000);
  console.log(` Aplicação rodando em: http://localhost:4000`);
  console.log(` Swagger disponível em: http://localhost:4000/swagger`);
}
bootstrap();
