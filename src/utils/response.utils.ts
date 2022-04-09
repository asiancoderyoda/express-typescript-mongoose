import { injectable } from 'inversify';

@injectable()
class ResponseUtils {
    public ResponseCode = {
        Success: 0,
        InvalidInput: 1,
        InternalServerError: 2,
    };

    public getResponseMsg = (code: number) => {
        switch (code) {
            case this.ResponseCode.Success:
                return 'Success';
            case this.ResponseCode.InvalidInput:
                return 'Invalid Input';
            case this.ResponseCode.InternalServerError:
                return 'Internal Server Error';
            default:
                return 'Internal Server Error';
        }
    };
}

export { ResponseUtils };
