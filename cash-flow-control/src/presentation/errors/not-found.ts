export class NotFoundError extends Error {
  constructor(id: string) {
    super(`Object with id (${id}) cannot be found`);
    this.name = 'NotFoundError';
  }
}
