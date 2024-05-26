import {MetaPagination} from "./meta"
import {BadRequest, NotFound, InternalServerError, Unauthorized, BadGateway, NotImplemented, Forbidden} from 'http-errors';
import {SUCCESS_CODES} from './codes';

export interface Response<T> {
    message: string;
    code: number;
    data?: T;
    meta?: MetaPagination;
}


export class SuccessResponse<data> implements Response<data> {
    code: number;
    message: string;
    data?: data;
    meta?: MetaPagination;

    constructor(message: string, code: number,  data?: data, meta?: MetaPagination) {
        this.code = code;
        this.message = message;
        this.data = data;
        this.meta = meta;
    }
}


export class InternalServerErrorResp extends InternalServerError {
    constructor(message?: string) {
      super(message ?? 'Internat server error');
    }
}

export class BadGatewayResp extends BadGateway {
    constructor(message?: string) {
      super(message ?? 'Bad Gateway');
    }
}

export class UnauthorizedResp extends Unauthorized {
    constructor(message?: string) {
      super(message ?? 'unauthorized');
    }
}

export class BadRequestResp extends BadRequest {
    constructor(message?: string) {
      super(message ?? 'Bad Request');
    }
}

export class NotFoundResp extends NotFound {
    constructor(message?: string) {
      super(message ?? 'Not Found');
    }
}

export class NotImplementedResp extends NotImplemented {
    constructor(message?: string) {
      super(message ?? 'Not Implemented');
    }
}

export class ForbiddenResp extends Forbidden {
    constructor(message?: string) {
      super(message ?? 'Forbidden');
    }
}


export class OkResp<data> extends SuccessResponse<data> {
    constructor(data?:data, message:string = "ok", meta?:MetaPagination) {
        super((message === "")?"ok":message, SUCCESS_CODES.OK, data, meta);
      }
}

export class CreatedResp<data> extends SuccessResponse<data> {
    constructor(data?:data, message:string = "created",  meta?:MetaPagination) {
        super(message===""?"created":message, SUCCESS_CODES.CREATED, data, meta);
      }
}

export class AcceptedResp<data> extends SuccessResponse<data> {
    constructor(data?:data, message:string = "accepted", meta?:MetaPagination) {
        super(message===""?"accepted":message, SUCCESS_CODES.ACCEPTED, data, meta);
      }
}