// src/url/url.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class UrlService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly redisService: RedisService,
    ) {}

    async createShortenUrl(originalUrl: string): Promise<string> {
        const cachedShortenedUrl = await this.redisService.get(originalUrl);
        if (cachedShortenedUrl) {
            return cachedShortenedUrl;
        }

        const shortenedUrl = 'http://localhost:3000/url/' + uuidv4();

        await this.prismaService.url.create({
            data: {
                originalUrl,
                shortenedUrl,
            },
        });

        await this.redisService.set(originalUrl, shortenedUrl);

        return shortenedUrl;
    }

    async resolveUrl(shortenedUrl: string): Promise<string> {
        const cachedOriginalUrl = await this.redisService.get(shortenedUrl);
        if (cachedOriginalUrl) {
            return cachedOriginalUrl;
        }

        const url = await this.prismaService.url.findUnique({
            where: {
                shortenedUrl: `http://localhost:3000/url/${shortenedUrl}`,
            },
        });

        if (!url) {
            throw new NotFoundException('Shortened URL not found');
        }

        await this.redisService.set(shortenedUrl, url.originalUrl);

        return url.originalUrl;
    }
}
