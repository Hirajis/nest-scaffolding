/* 
* Nest and third party imports
*/
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

/* 
* custom imports
*/
import { AppModule } from './app.module';
import { LogService } from './service/logger.service';
require('dotenv').config({ "path": './secured/.env' });


/* Define port */
const port = process.env.PORT || 8081;


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  let Logger = new LogService();

  /* app initialization */
  app.useGlobalPipes(new ValidationPipe());
  app.use(bodyParser.json());
  app.enableCors();
  app.setGlobalPrefix(process.env.VERSION);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', '/src/views'))
  app.setViewEngine('ejs');


  const options = new DocumentBuilder()
    .setTitle('Nest Js Scaffolding')
    .setDescription('Put your application description if you are using this scaffolding')
    .setVersion(process.env.SwaggerVersion)
    .addBearerAuth('Authorization', 'header', 'apiKey')
    .setSchemes("https", "http")
    .setBasePath(process.env.VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${process.env.VERSION}/docs`, app, document);

  await app.listen(port);

  Logger.debug(`APIVERSION = ${process.env.VERSION}`);
  Logger.debug(`PORT = ${port}`);
  Logger.debug(`NODE_ENV = ${process.env.NODE_ENV}`);
}

bootstrap();
