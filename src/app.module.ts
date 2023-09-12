import { Module } from '@nestjs/common';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {RedisService} from "./redis/redis.service";
import {UrlService} from "./url/url.service";
import {UrlController} from "./url/url.controller";
import {PrismaService} from "./prisma/prisma.service";

@Module({
  imports: [    ClientsModule.register([
    {
      name: 'redis-url-shortener',
      transport: Transport.REDIS,
      options: {
        host: 'localhost',
        port: 6379,
      }
    },
  ]),],
  controllers: [UrlController],
  providers: [RedisService, UrlService, PrismaService],
})
export class AppModule {}
