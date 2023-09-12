import {Controller, Get, NotFoundException, Param, Post, Query, Redirect} from '@nestjs/common';
import {UrlService} from "./url.service";

@Controller('url')
export class UrlController {
    constructor(private urlService: UrlService,) {}

    @Post('')
    async set(@Query('link') link: string) {
        return await this.urlService.createShortenUrl(link);
    }

    @Get(':link')
    @Redirect('', 302)
    async redirectToOriginalUrl(@Param('link') link: string) {
        const originalUrl = await this.urlService.resolveUrl(link);

        if (!originalUrl) {
            throw new NotFoundException('Shortened URL not found');
        }

        return { url: originalUrl };
    }

}