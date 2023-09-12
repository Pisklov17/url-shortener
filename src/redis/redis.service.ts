// redis.service.ts
import { Injectable } from '@nestjs/common';
import { default as Redis } from 'ioredis'
const redis = new Redis()

@Injectable()
export class RedisService {
    private readonly redisClient: Redis;

    constructor() {
        this.redisClient = new Redis({
            host: 'localhost',
            port: 6379,
        });
    }

    async get(key: string): Promise<string | null> {
        return this.redisClient.get(key);
    }

    async set(key: string, value: string): Promise<void> {
        await this.redisClient.set(key, value);
    }
}
