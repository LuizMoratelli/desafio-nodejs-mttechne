import { adaptValidator } from './class-validator-adapter';

describe('Class Validator Adapter', () => {
  test('Should map errors correctly', async () => {
    const response = adaptValidator({
      data: {},
      errors: [{ constraints: { error: 'error', error2: 'error2' }, property: 'property' }],
    })();

    expect(response).toMatchObject({ data: {}, errors: { invalidParams: [{ property: ['error', 'error2'] }] } });
  });

  test('Should map errors correctly if constraints is null', async () => {
    const response = adaptValidator({
      data: {},
      errors: [{ property: 'property' }],
    })();

    expect(response).toMatchObject({ data: {}, errors: { invalidParams: [{ property: [] }] } });
  });
});
