import { ApiClientError } from './base';

export type ValidationIssue = {
  path: string;
  message: string;
};

export class ValidationError extends ApiClientError {
  public issues: ValidationIssue[];
  constructor(message: string, issues: ValidationIssue[]) {
    super('VALIDATION_ERROR', 400, message);
    this.name = 'ValidationError';
    this.issues = issues;
  }
}
