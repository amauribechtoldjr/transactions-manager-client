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
          errorMessage: 'emailNotFilled',
        },
        {
          type: EValidationTypes.VALID,
          execIsValid: value => /\S+@\S+\.\S+/.test(value),
          errorMessage: 'emailInvalid',
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
          errorMessage: 'passwordNotFilled',
        },
      ],
    },
  ];
};
