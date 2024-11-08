import { MiddlewareConsumer, Module, NestModule, Logger } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AnalyticsModule } from './analytics/analytics.module';
import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import postgresConfig from './config/postgres.config';
import jwtConfig from './config/jwt.config';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import swaggerConfig from './config/swagger.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [postgresConfig, jwtConfig, swaggerConfig] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        let obj: TypeOrmModuleOptions = {
          type: 'postgres',
          host: configService.get('postgres.host'),
          port: configService.get('postgres.port'),
          database: configService.get('postgres.database'),
          username: configService.get('postgres.username'),
          password: configService.get('postgres.password'),
          autoLoadEntities: true,
        };
        if (configService.get('STAGE') === 'local') {
          obj = Object.assign(obj, {
            logging: true,
            synchronize: false,
          });
        }
        return obj;
      },
    }),
    AuthModule,
    UserModule,
    VideoModule,
    AnalyticsModule,
  ],
  providers: [Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
