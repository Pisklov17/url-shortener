import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';

describe('UrlController', () => {
    let controller: UrlController;
    let urlService: UrlService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UrlController],
            providers: [
                UrlService,
                PrismaService,
                RedisService,
            ],
        }).compile();

        controller = module.get<UrlController>(UrlController);
        urlService = module.get<UrlService>(UrlService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('set', () => {
        it('should create a shortened URL', async () => {
            const link = 'https://example.com';
            const shortenedUrl = 'http://localhost:3000/url/123';

            jest.spyOn(urlService, 'createShortenUrl').mockResolvedValue(shortenedUrl);

            const result = await controller.set(link);
            expect(result).toEqual(shortenedUrl);
        });
    });

    describe('redirectToOriginalUrl', () => {
        it('should redirect to the original URL', async () => {
            const link = '123';
            const originalUrl = 'https://example.com';

            jest.spyOn(urlService, 'resolveUrl').mockResolvedValue(originalUrl);

            const result = await controller.redirectToOriginalUrl(link);
            expect(result.url).toEqual(originalUrl);
        });

        it('should throw NotFoundException if the URL is not found', async () => {
            const link = 'nonexistentlink';

            jest.spyOn(urlService, 'resolveUrl').mockResolvedValue(null);

            try {
                await controller.redirectToOriginalUrl(link);
            } catch (e) {
                expect(e).toBeInstanceOf(NotFoundException);
            }
        });
    });
});
