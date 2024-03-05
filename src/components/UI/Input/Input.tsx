import React, { useState, ChangeEvent } from 'react';
import { StyledInput } from './';

interface InputProps {
  placeholder: string;
  name: string;
  type?: string;
  defaultValue?: string | number;
  onBlur?: (inputValue?: string) => void;
}

export const Input: React.FC<InputProps> = ({
  placeholder,
  name,
  type,
  defaultValue,
  onBlur,
}) => {
  const [inputValue, setInputValue] = useState<string>(
    defaultValue?.toString() || ''
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <StyledInput
      name={name}
      type={type ? type : 'text'}
      value={inputValue}
      placeholder={placeholder}
      onChange={handleInputChange}
      onBlur={onBlur ? () => onBlur(inputValue) : undefined}
    />
  );
};
