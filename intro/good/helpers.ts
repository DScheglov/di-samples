import { ServerResponse } from './Books.ServerTypes';
import { Response } from './IHttpClient';

export const readDataFromBody = <T>({ body }: Response<ServerResponse<T>>) =>
  body.data;

export const hasStatus = ({ status }: Response<any>, expectedStatus: number) =>
  status === expectedStatus;

export const rejectError = (message: string, { status, statusText }: Response<any>) =>
  Promise.reject(new Error(`${message}: ${status} - ${statusText}`));
