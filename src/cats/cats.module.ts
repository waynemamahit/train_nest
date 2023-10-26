import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';
import { CatsController } from './cats.controller';
import { CatsService } from './shared/cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        {
          path: 'cats',
          method: RequestMethod.GET,
        },
        {
          path: 'cats',
          method: RequestMethod.PATCH,
        },
        {
          path: 'cats',
          method: RequestMethod.PUT,
        },
      )
      .forRoutes(CatsController);
  }
}
