export enum EValidationTypes {
  FILLED = 'FILLED',
  VALID = 'VALID',
}

export type IValidationInput = {
  execIsValid: (input: string) => boolean;
  type: EValidationTypes;
  errorMessage?: string;
  success?: boolean;
};

export interface IFormField {
  name: string;
  validations: IValidationInput[];
  error?: string;
  value: string;
  required?: boolean;
}

export interface ValidateResult {
  validationSuccess: boolean;
  field: IFormField;
}

export interface ValidateFormResult {
  validationSuccess: boolean;
  fields: IFormField[];
}

export const validateForm = (fields: IFormField[]): ValidateFormResult => {
  let newFields: IFormField[] = fields;
  let validationSuccess: boolean = true;
  let fieldResult: ValidateResult;

  newFields = initializeFields(newFields);

  newFields = newFields.map(field => {
    fieldResult = validateField(field);

    field = fieldResult.field;

    if (!fieldResult.validationSuccess) {
      validationSuccess = false;
    }

    return field;
  });

  return { fields: newFields, validationSuccess };
};

const initializeFields = (fields: IFormField[]): IFormField[] => {
  return fields.map(field => {
    field.validations.map(validation => {
      if (
        validation.type === EValidationTypes.FILLED &&
        !validation.errorMessage
      ) {
        validation.errorMessage = 'Campo obrigatório.';
      }
      validation.success = true;
      return validation;
    });

    if (!field.required) {
      field.required = true;
    }

    field.error = '';

    return field;
  });
};

const validateField = (input: IFormField): ValidateResult => {
  let validationSuccess = true;
  let newField: IFormField = input;

  newField.validations.every(validation => {
    if (newField.required) {
      validation.success = validation.execIsValid(input.value);
    }
    if (!validation.success) {
      newField.error = validation.errorMessage;
      validationSuccess = false;
      return false;
    }
    return true;
  });

  return {
    field: newField,
    validationSuccess,
  };
};

export const handleFieldChange = (
  newValue: any,
  fieldName: string,
  fields: IFormField[]
): IFormField[] => {
  return fields.map(field => {
    if (field.name === fieldName) {
      field.value = newValue as string;
    }
    return field;
  });
};

export const clearFields = (fields: IFormField[]): IFormField[] => {
  return fields.map(field => {
    field.value = '';
    return field;
  });
};

export const getFieldValue = (fieldName: string, fields: IFormField[]) => {
  let fieldValue: string = '';

  fields.forEach(field => {
    if (field.name === fieldName) {
      fieldValue = field.value;
    }
  });

  return fieldValue;
};

export const getFieldError = (
  fieldName: string,
  fields: IFormField[]
): string => {
  let error: string | undefined;

  fields.forEach(field => {
    if (field.name === fieldName) {
      error = field.error;
    }
  });

  if (error === undefined) {
    error = '';
  }

  return error;
};
