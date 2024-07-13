import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateshortenUrlDto } from './dtos/CreateshortenUrl.dto';
import { ShortenUrlServiceImpl } from './shortenUrl.service';

@Controller('shorten-url')
export class ShortenUrlController {
  constructor(private readonly ShortenUrlServiceImpl: ShortenUrlServiceImpl) {}
  private createResponse(statusCode: number, message: string, data?: any) {
    return {
      statusCode,
      message,
      data: data,
    };
  }
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  async generateUrl(
    @Req() req: Request,
    @Body() createshortenUrlDto: CreateshortenUrlDto,
  ) {
    try {
      const { redirectUrl } = createshortenUrlDto;
      const data = await this.ShortenUrlServiceImpl.generateUrl(redirectUrl);
      return this.createResponse(
        HttpStatus.CREATED,
        'Url created successfully',
        data,
      );
    } catch (err) {
      console.log(err);
      throw new HttpException(err.message, err.status);
    }
  }

  @Get('/:shortId')
  async redirectUrl(
    @Param('shortId') shortId: string | number,
    @Res() res: Response,
  ) {
    try {
      const data = await this.ShortenUrlServiceImpl.redirectUrl(shortId);
      res.redirect(data);
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAnalytic() {
    try {
      const data = await this.ShortenUrlServiceImpl.getAnalytic();
      return this.createResponse(
        HttpStatus.CREATED,
        'Url Fetches successfully',
        data,
      );
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUrl(@Param('id') id: string) {
    try {
      const data = await this.ShortenUrlServiceImpl.deleteUrl(id);
      return this.createResponse(
        HttpStatus.NO_CONTENT,
        'Url Deleted SuccessFully',
        data,
      );
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
}
