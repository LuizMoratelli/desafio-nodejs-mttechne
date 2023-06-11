export type HttpResponse<T = any> = {
  statusCode: number;
  body?: T;
};

export type HttpRequest<T = any, Y = any> = {
  body?: T;
  params?: Y;
};
