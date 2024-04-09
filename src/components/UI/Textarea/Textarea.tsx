import React, { useState, ChangeEvent } from 'react';

import TextareaAutosize from 'react-textarea-autosize';
import { TextareaWrapper } from '.';

interface TextareaProps {
  placeholder: string;
  name?: string;
  customStyle?: Record<string, string>;
  ariaLabel: string;
  defaultValue?: string | number;
  onBlur?: (textareaValue?: string) => void;
}

export const Textarea: React.FC<TextareaProps> = ({
  placeholder,
  name,
  ariaLabel,
  defaultValue,
  onBlur,
  customStyle,
}) => {
  const [textareaValue, setTextareaValue] = useState<string>(
    defaultValue?.toString() || ''
  );

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  const baseStyle = {
    color: 'inherit',
    resize: 'none',
    border: 'none',
    backgroundColor: 'inherit',
    width: '100%',
    overflow: 'hidden',
    fontSize: '15px',
    marginLeft: '2px',
    lineHeight: '20px',
    wordBreak: 'break-word',
    maxWidth: '14rem',
  } as const;

  return (
    <TextareaWrapper $transparent={Number(!!customStyle?.backgroundColor)}>
      <TextareaAutosize
        name={name}
        value={textareaValue}
        placeholder={placeholder}
        aria-label={ariaLabel}
        onChange={handleTextareaChange}
        style={
          customStyle
            ? {
                ...baseStyle,
                ...customStyle,
              }
            : baseStyle
        }
        onBlur={onBlur ? () => onBlur(textareaValue) : undefined}
      />
    </TextareaWrapper>
  );
};
