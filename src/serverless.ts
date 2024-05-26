import { Response, InternalServerErrorResp } from './';
import {HttpError} from 'http-errors'

export interface SlsResponseI {
  statusCode: number;
  body: string;
  headers?: { [key: string]: string };
}

const SlsSuccess = <T>(
    response: Response<T>,
    headers?: { [key: string]: string },
  ): SlsResponseI => ({
    statusCode: response.code,
    body: JSON.stringify(response),
    headers,
  });

const SlsError = (
  response: HttpError,
  headers?: { [key: string]: string },
): SlsResponseI => ({
  statusCode: response.statusCode,
  body: JSON.stringify(response),
  headers,
});

export const CommonHeader: { [key: string]: string } = {
  'Access-Control-Allow-Headers':
    'Content-Type,X-Amz-Date,X-Amz-Security-Token',
  'Access-Control-Allow-Methods': 'GET,OPTIONS,POST,PUT,PATCH',
  'Access-Control-Allow-Origin': '*',
};

export const SlsHandlerSuccess = async <T>(res: Response<T>, headers?: {[key: string]:string}) => {
    if (!headers) {
        headers = CommonHeader
    }
    if (!("code" in res)) {
        return SlsError(new InternalServerErrorResp(), headers);
    }
    return SlsSuccess(res, headers);
};

export const SlsHandlerError = async (res: Error, headers?: {[key: string]:string}) => {
    if (!headers) {
        headers = CommonHeader
    }
    if (res instanceof HttpError) {
        return SlsError(res, headers);
    }

    return SlsError(new InternalServerErrorResp(res.message), headers);
};

export interface Request<Body> {
  body: Body,
  pathParemeters: { [key: string]: string },
  queryStringParameters: { [key: string]: string },
  headers: {[key: string]:string},
  rawPath: string,
}

export const castRequest = <Body>(req: Request<string>): Request<Body> => {
    return {
        ...req, 
        body: JSON.parse(req.body) as Body,
    };
}