import { IFormField, EValidationTypes } from '../../../helpers/forms';

export const getFieldsSignIn: () => IFormField[] = () => {
  return [
    {
      name: 'email',
      value: '',
      validations: [
        {
          type: EValidationTypes.FILLED,
          execIsValid: value => value !== '',
          errorMessage: 'E-mail não preenchido.',
        },
        {
          type: EValidationTypes.VALID,
          execIsValid: value => /\S+@\S+\.\S+/.test(value),
          errorMessage: 'Formato inválido.',
        },
      ],
    },
    {
      name: 'password',
      value: '',
      validations: [
        {
          type: EValidationTypes.FILLED,
          execIsValid: value => value !== '',
          errorMessage: 'Senha não preenchida.',
        },
      ],
    },
  ];
};
