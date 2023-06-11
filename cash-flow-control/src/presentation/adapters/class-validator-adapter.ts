import { ValidatorResponse } from '@/infra/validation/class-validator/validator';

type ValidationErrorProperty = {
  [key: string]: string[];
};

export const adaptValidator = <T>(validatorResponse: ValidatorResponse<T>) => {
  return () => {
    const { data, errors } = validatorResponse;

    const formattedErrors = errors.map(
      (error) =>
        ({
          [error.property]: Object.values(error.constraints || []),
        } as ValidationErrorProperty)
    );

    return {
      data,
      errors: formattedErrors.length ? { invalidParams: formattedErrors } : null,
    };
  };
};
