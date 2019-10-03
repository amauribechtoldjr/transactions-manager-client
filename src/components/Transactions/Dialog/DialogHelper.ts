import { IFormField, EValidationTypes } from '../../../helpers/forms';

export const DESCRIPTION = 'DESCRIPTION';
export const VALUE = 'VALUE';
export const TYPE = 'TYPE';

export const getTransactionFields: () => IFormField[] = () => {
  return [
    {
      name: DESCRIPTION,
      value: '',
      validations: [
        {
          type: EValidationTypes.FILLED,
          execIsValid: value => value !== '',
        },
      ],
    },
    {
      name: VALUE,
      value: '',
      validations: [
        {
          type: EValidationTypes.FILLED,
          execIsValid: value => value !== '',
        },
        {
          type: EValidationTypes.VALID,
          execIsValid: value =>
            /^[+-]?\d+(\.\d+)?$/.test(value.replace(/,/g, '')),
          errorMessage: 'Valor inválido.',
        },
      ],
    },
    {
      name: TYPE,
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
