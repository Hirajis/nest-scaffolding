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
const port = process.env.PORT || 8080;
const apiVersion = process.env.APIVERSION || 'v1';
const nodeEnv = process.env.NODE_ENV || 'development';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  let Logger = new LogService();

  /* app initialization */
  app.useGlobalPipes(new ValidationPipe());
  app.use(bodyParser.json());
  app.enableCors();
  app.setGlobalPrefix(apiVersion);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', '/src/views'))
  app.setViewEngine('ejs');


  const options = new DocumentBuilder()
    .setTitle('Nest Js Scaffolding')
    .setDescription('Put your application description if you are using this scaffolding')
    .setVersion('3.0')
    .addBearerAuth('Authorization', 'header', 'apiKey')
    .setSchemes("https", "http")
    .setBasePath(apiVersion)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${apiVersion}/docs`, app, document);

  await app.listen(port);

  Logger.debug(`APIVERSION = ${apiVersion}`);
  Logger.debug(`PORT = ${port}`);
  Logger.debug(`NODE_ENV = ${nodeEnv}`);
}

bootstrap();
