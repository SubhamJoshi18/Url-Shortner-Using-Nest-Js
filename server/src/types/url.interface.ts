export interface IResponseUrl {
  id: string | number;
  shortUrl: string;
}

export interface IResponseGetAnalytic {
  totalClicks: number;
  shortId: string;
  shortUrl: string;
  originalUrl: string;
}
