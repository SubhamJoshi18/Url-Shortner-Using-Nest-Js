import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { Url, UrlDocuments } from 'src/database/schemas/url.schema';
import { IResponseGetAnalytic, IResponseUrl } from 'src/types/url.interface';
import { ShortenUrlService } from './interface/shortendUrl.interface';

@Injectable()
export class ShortenUrlServiceImpl implements ShortenUrlService {
  constructor(
    @InjectModel(Url.name) private urlModel: Model<Url | UrlDocuments>,
  ) {}

  async generateUrl(url: string): Promise<Partial<IResponseUrl | string>> {
    if (typeof url === 'string' && url.length === 0) {
      throw new UnsupportedMediaTypeException('Url is an empty string');
    }

    let urlResponse: Partial<IResponseUrl> = {};

    const originalUrl = await this.urlModel.findOne({ redirectUrl: url });
    if (originalUrl) {
      throw new ConflictException(
        'The Url you inserted is already present below',
      );
    }
    const shortId = nanoid(8);
    let shortUrl = `http://localhost:5000/api/shorten-url/${shortId}`;
    const urlData = new this.urlModel({
      shortId: shortId,
      redirectUrl: url,
      shortUrl: shortUrl,
      visitHistory: [],
    });

    await urlData.save();
    urlResponse.id = shortId;
    urlResponse.shortUrl = `http://localhost:5000/api/shorten-url/${shortId}`;
    return urlResponse;
  }

  async redirectUrl(shortId: string | number): Promise<string> {
    const url = await this.urlModel.findOne({ shortId: shortId }).exec();
    if (!url) {
      throw new NotFoundException('Url is not available or invalid input');
    }
    const entry = await this.urlModel.findOneAndUpdate(
      {
        shortId: shortId,
      },
      {
        $push: {
          visitHistory: { timestamp: Date.now() },
        },
        totalClicks: url.totalClicks + 1,
      },
    );
    return url.redirectUrl;
  }

  async getAnalytic(): Promise<Required<IResponseGetAnalytic | Url[]>> {
    const result = await this.urlModel.find({});
    if (!result) {
      throw new NotFoundException('Url not Found');
    }
    // const responseObject: Required<IResponseGetAnalytic> = {
    //   totalClicks: result.visitHistory.length,
    //   originalUrl: result.redirectUrl,
    //   shortId: result.shortId,
    //   shortUrl: result.shortUrl,
    // };

    return result;
  }

  async deleteUrl(id: string) {
    const checkUrl = await this.urlModel.findOne({ _id: id });
    if (!checkUrl) {
      throw new NotFoundException(`Url ${id} does not exists`);
    }
    const result = await this.urlModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new BadRequestException('Delete operation failed');
    }
    return 'Url is Deleted SuccessFully';
  }
}
