import { Request, Response } from "express";

export class BaseResponse {
  constructor(req: Request, res: Response) {
    this._res = res;
  }
  public success: boolean = true;
  public data: any = null;
  public message: string;
  public _res: Response;
  public send() {
    const response = this.data;
    const nStatus = 200;
    this._res.status(nStatus).json(response);
  }
}
export const baseResponse = (
  res: Response,
  success: boolean,
  message: string,
  data: any
) => {
  res.status(200).json({
    success,
    message,
    data,
  });
};
