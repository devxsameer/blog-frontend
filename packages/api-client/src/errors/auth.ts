import { ApiClientError } from './base';

export class AuthError extends ApiClientError {
  constructor(message: string = 'Authentication Required') {
    super('UNAUTHORIZED', 401, message);
    this.name = 'AuthError';
  }
}
