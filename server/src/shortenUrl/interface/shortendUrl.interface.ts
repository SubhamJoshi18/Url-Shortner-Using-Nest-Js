import { Url } from 'src/database/schemas/url.schema';
import { IResponseGetAnalytic, IResponseUrl } from 'src/types/url.interface';

export interface ShortenUrlService {
  generateUrl(url: string): Promise<Partial<IResponseUrl | string>>;
  redirectUrl(shortId: string | number): Promise<string>;
  getAnalytic(
    shortId: string | number,
  ): Promise<Required<IResponseGetAnalytic | Url[]>>;
  deleteUrl(id: string): Promise<string>;
}
