import { All, Controller, Get, Next, Post, Req, Res } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import OidcAuth from './oidc.auth';
import oidc from './oidc.provider';

const callback = oidc.callback();

@Controller('oidc')
export class OidcController {
  @Get('/interaction/:uid')
  async interactionByUid(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    console.log(`[${req.originalUrl}]`);
    res.set('Pragma', 'no-cache');
    res.set('Cache-Control', 'no-cache, no-store');

    try {
      const details = await oidc.interactionDetails(req, res);
      const { uid, prompt, params } = details;

      const client = await oidc.Client.find((params as any).client_id);

      if (prompt.name === 'login') {
        return res.render('login', {
          client,
          uid,
          details: prompt.details,
          params,
          title: 'Sign-in',
          flash: undefined,
        });
      }

      console.log('interaction render props', {
        client,
        uid,
        details: prompt.details,
        params,
        title: 'Authorize',
      });
      return res.render('interaction', {
        client,
        uid,
        details: prompt.details,
        params,
        title: 'Authorize',
      });
    } catch (err) {
      return next(err);
    }
  }

  @Post('/interaction/:uid/login')
  async interactionForLogin(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    console.log(`[${req.originalUrl}]`);
    res.set('Pragma', 'no-cache');
    res.set('Cache-Control', 'no-cache, no-store');

    try {
      const { uid, prompt, params } = await oidc.interactionDetails(req, res);
      const client = await oidc.Client.find((params as any).client_id);

      const accountId = await OidcAuth.authenticate(req.body.email, req.body.password);
      console.log('accountId', accountId);

      if (!accountId) {
        res.render('login', {
          client,
          uid,
          details: prompt.details,
          params: {
            ...params,
            login_hint: req.body.email,
          },
          title: 'Sign-in',
          flash: 'Invalid email or password.',
        });
        return;
      }

      const result = {
        login: { accountId },
      };

      return oidc.interactionFinished(req, res, result, { mergeWithLastSubmission: false });
    } catch (err) {
      next(err);
    }
  }

  @Post('/interaction/:uid/confirm')
  async interactionForConfirm(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    console.log(`[${req.originalUrl}]`);
    res.set('Pragma', 'no-cache');
    res.set('Cache-Control', 'no-cache, no-store');

    try {
      const interactionDetails = await oidc.interactionDetails(req, res);
      const {
        prompt: { name, details },
        params,
        session: { accountId },
      } = interactionDetails;

      let { grantId } = interactionDetails;
      let grant;

      if (grantId) {
        // we'll be modifying existing grant in existing session
        grant = await oidc.Grant.find(grantId);
      } else {
        // we're establishing a new grant
        grant = new oidc.Grant({
          accountId,
          clientId: (params as any).client_id,
        });
      }

      if (details.missingOIDCScope) {
        grant.addOIDCScope((details.missingOIDCScope as any).join(' '));
        // use grant.rejectOIDCScope to reject a subset or the whole thing
      }
      if (details.missingOIDCClaims) {
        grant.addOIDCClaims(details.missingOIDCClaims);
        // use grant.rejectOIDCClaims to reject a subset or the whole thing
      }
      if (details.missingResourceScopes) {
        // eslint-disable-next-line no-restricted-syntax
        for (const [indicator, scopes] of Object.entries(details.missingResourceScopes)) {
          grant.addResourceScope(indicator, scopes.join(' '));
          // use grant.rejectResourceScope to reject a subset or the whole thing
        }
      }

      grantId = await grant.save();

      const consent = {};
      if (!interactionDetails.grantId) {
        // we don't have to pass grantId to consent, we're just modifying existing one
        consent['grantId'] = grantId;
      }

      const result = { consent };
      return oidc.interactionFinished(req, res, result, { mergeWithLastSubmission: true });
    } catch (err) {
      next(err);
    }
  }

  @Get('/interaction/:uid/abort')
  async interactionForAbort(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    console.log(`[${req.originalUrl}]`);
    res.set('Pragma', 'no-cache');
    res.set('Cache-Control', 'no-cache, no-store');

    try {
      const result = {
        error: 'access_denied',
        error_description: 'End-User aborted interaction',
      };
      return oidc.interactionFinished(req, res, result, { mergeWithLastSubmission: false });
    } catch (err) {
      next(err);
    }
  }

  @All('/*')
  public mountedOidc(@Req() req: Request, @Res() res: Response): void {
    req.url = req.originalUrl.replace('/oidc', '');
    return callback(req, res);
  }
}
