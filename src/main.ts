import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Agent, TSchema, createAgent } from '@forestadmin/agent';
import { createSqlDataSource } from '@forestadmin/datasource-sql';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const agent = createAgent({
    authSecret: process.env.FOREST_AUTH_SECRET,
    envSecret: process.env.FOREST_ENV_SECRET,
    isProduction: false, // process.env.NODE_ENV === 'production',
    typingsPath: '/typings.ts',
    typingsMaxDepth: 5,
    schemaPath: '/forestadmin-schema.json',
  });

  await agent.mountOnNestJs(app).start();

  await app.listen(3000);
}
bootstrap();
