import { ClassConstructor, plainToInstance } from 'class-transformer';
import { Validator } from './validator';
import { ValidationError, validate as classValidator } from 'class-validator';

export class DtoValidator implements Validator {
  async validate<T extends object>(
    cls: ClassConstructor<T>,
    data: any
  ): Promise<{ data: T; errors: ValidationError[] }> {
    const transfomed = plainToInstance(cls, data, { exposeDefaultValues: true, exposeUnsetFields: true });
    const errors = await classValidator(transfomed);

    return {
      data: transfomed,
      errors,
    };
  }
}
