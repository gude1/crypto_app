export type ResponseData = null | [] | string | object;
export type Response = {
  ResponseCode: string;
  ResponseMessage: string;
  Data: ResponseData;
};
