import { Module } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { UrlController } from './url.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [UrlController],
  providers: [RedisService, PrismaService],
})
export class AppModule {}
