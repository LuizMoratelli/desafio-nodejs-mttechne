import { ClassConstructor } from 'class-transformer';
import { ValidationError } from 'class-validator';

export type ValidatorResponse<T> = {
  data: T;
  errors: ValidationError[];
};

export interface Validator {
  validate<T extends object>(cls: ClassConstructor<T>, data: any): Promise<ValidatorResponse<T>>;
}
