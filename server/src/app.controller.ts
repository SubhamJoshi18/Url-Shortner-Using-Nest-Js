import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  async landingRoute() {
    console.log(process.env.MONGO_URL);
    return 'Nest JS Task: URL Shortening';
  }
}
