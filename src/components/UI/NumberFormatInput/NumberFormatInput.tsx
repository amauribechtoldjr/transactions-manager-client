import * as React from 'react';
import NumberFormat from 'react-number-format';

const NumberFormatInput: React.FC = (props: any) => {
  const { inputRef, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={(ref: any) => {
        inputRef(ref ? ref : null);
      }}
      thousandSeparator={true}
    />
  );
};

export default NumberFormatInput;
