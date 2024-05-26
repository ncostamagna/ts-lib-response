import {BadRequestResp} from '../src';
import {HttpError} from 'http-errors';

describe('Error Responses', () => {
  it('bad request', async () => {
    try{
      throw new BadRequestResp("my bad request response")
    }catch(e: unknown | Error){
      expect(e).toBeInstanceOf(HttpError);
      expect((e as HttpError).statusCode).toBe(400);
      expect((e as HttpError).message).toBe("my bad request response");
    }
  });

});
