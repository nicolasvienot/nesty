import { Logger as NestLogger } from '@nestjs/common';
import { AppModule } from '@/app.module';
import { repl } from '@nestjs/core';

async function bootstrap() {
  await repl(AppModule);
}

void (async (): Promise<void> => {
  try {
    await bootstrap();
    NestLogger.log('REPLServer', 'Bootstrap');
  } catch (e) {
    NestLogger.log(e, 'Bootstrap');
  }
})();
