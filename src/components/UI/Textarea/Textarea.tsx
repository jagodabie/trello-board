import React, { useState, ChangeEvent } from 'react';

import TextareaAutosize from 'react-textarea-autosize';
import { TextareaWrapper } from '.';

interface TextareaProps {
  placeholder: string;
  name?: string;
  header?: number;
  ariaLabel: string;
  defaultValue?: string | number;
  onBlur?: (textareaValue?: string) => void;
}

export const Textarea: React.FC<TextareaProps> = ({
  placeholder,
  name,
  header,
  ariaLabel,
  defaultValue,
  onBlur,
}) => {
  const [textareaValue, setTextareaValue] = useState<string>(
    defaultValue?.toString() || ''
  );

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };
  const maxWidth = header ? 'none' : !name ? '14rem' : '12rem';

  return (
    <TextareaWrapper $header={header} $transparent={1}>
      <TextareaAutosize
        name={name}
        value={textareaValue}
        placeholder={placeholder}
        aria-label={ariaLabel}
        onChange={handleTextareaChange}
        style={{
          color: '#fff',
          backgroundColor: !name ? 'transparent' : '#002e4e',
          resize: 'none',
          border: 'none',
          width: '100%',
          overflow: 'hidden',
          fontSize: '15px',
          marginLeft: '2px',
          maxWidth: `${maxWidth}`,
          lineHeight: '20px',
          wordBreak: 'break-word',
        }}
        onBlur={onBlur ? () => onBlur(textareaValue) : undefined}
      />
    </TextareaWrapper>
  );
};
