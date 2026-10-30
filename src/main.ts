import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { GrpcOptions, KafkaOptions, Transport } from '@nestjs/microservices';
import {
  NOTIFICATION_GRPC_LOADER_OPTIONS,
  NOTIFICATION_GRPC_PACKAGES,
  NOTIFICATION_GRPC_PROTO_PATHS,
} from '@ross2p/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Notification');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Fire-and-forget events only — synchronous RPC is served over gRPC below.
  app.connectMicroservice<KafkaOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [configService.get<string>('KAFKA_BROKER')!],
        clientId: 'notification-client',
      },
      consumer: {
        groupId: 'notification-consumer',
        allowAutoTopicCreation: true,
      },
      subscribe: {
        fromBeginning: true,
      },
    },
  });

  app.connectMicroservice<GrpcOptions>(
    {
      transport: Transport.GRPC,
      options: {
        package: NOTIFICATION_GRPC_PACKAGES,
        protoPath: NOTIFICATION_GRPC_PROTO_PATHS,
        loader: NOTIFICATION_GRPC_LOADER_OPTIONS,
        url: configService.getOrThrow<string>('NOTIFICATION_GRPC_URL'),
      },
    },
    { inheritAppConfig: true },
  );

  await app.startAllMicroservices();

  await app.init();
  logger.log('🚀 gRPC microservice started');
}

void bootstrap();
