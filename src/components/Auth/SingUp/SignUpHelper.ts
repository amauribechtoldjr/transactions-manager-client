import { IFormField, EValidationTypes } from '../../../helpers/forms';

export const FIRSTNAME = 'FIRSTNAME';
export const LASTNAME = 'LASTNAME';
export const EMAIL = 'EMAIL';
export const PASSWORD = 'PASSWORD';

export const getFieldsSignUp: () => IFormField[] = () => {
  return [
    {
      name: FIRSTNAME,
      value: '',
      validations: [
        {
          type: EValidationTypes.FILLED,
          execIsValid: value => value !== '',
        },
      ],
    },
    {
      name: LASTNAME,
      value: '',
      validations: [
        {
          type: EValidationTypes.FILLED,
          execIsValid: value => value !== '',
        },
      ],
    },
    {
      name: EMAIL,
      value: '',
      validations: [
        {
          type: EValidationTypes.FILLED,
          execIsValid: value => value !== '',
        },
        {
          type: EValidationTypes.VALID,
          execIsValid: value => /\S+@\S+\.\S+/.test(value),
          errorMessage: 'E-mail inválido.',
        },
      ],
    },
    {
      name: PASSWORD,
      value: '',
      validations: [
        {
          type: EValidationTypes.FILLED,
          execIsValid: value => value !== '',
        },
      ],
    },
  ];
};
