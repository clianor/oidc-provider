import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import provider from './oidc/oidc.provider';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('/interaction/:uid')
  // @Render('interaction')
  // interaction(@Param() params) {
  //   console.log('[/interaction/:uid]', params.uid);
  //   return { message: 'test' };
  // }

  @Get('/interaction/:uid')
  interactionByUid(@Req() req: Request, @Res() res: Response) {
    console.log(provider.interactionDetails(req, res));
    return;
  }
}
