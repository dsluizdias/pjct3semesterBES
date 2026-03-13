export interface HttpRequest {
  body?: any;
  query?: any;
  params?: any;
}

export interface HttpResponse {
  statusCode: number;
  body: any;
}

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data,
});

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: { error: error.message },
});

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: { error: 'Internal Server Error' },
});
