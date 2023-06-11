import { ServerError } from '@/presentation/errors';
import { HttpResponse } from '@/presentation/protocols/http';

export const badRequest = (error: Error | object): HttpResponse<Error | object> => ({
  statusCode: 400,
  body: error,
});

export const notFound = (error: Error): HttpResponse<Error | object> => ({
  statusCode: 404,
  body: { message: error.message },
});

export const serverError = (): HttpResponse<Error> => ({
  statusCode: 500,
  body: new ServerError(),
});

export const ok = <T>(data: T): HttpResponse<T> => ({
  statusCode: 200,
  body: data,
});
