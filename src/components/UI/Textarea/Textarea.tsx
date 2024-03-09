import React, { useState, ChangeEvent } from 'react';

import TextareaAutosize from 'react-textarea-autosize';
import { TextareaWrapper } from '.';

interface TextareaProps {
  placeholder: string;
  name: string;
  header?: boolean;
  defaultValue?: string | number;
  onBlur?: (textareaValue?: string) => void;
}

export const Textarea: React.FC<TextareaProps> = ({
  placeholder,
  name,
  header,
  defaultValue,
  onBlur,
}) => {
  const [textareaValue, setTextareaValue] = useState<string>(
    defaultValue?.toString() || ''
  );

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  return (
    <TextareaWrapper header={header}>
      <TextareaAutosize
        name={name}
        value={textareaValue}
        placeholder={placeholder}
        onChange={handleTextareaChange}
        style={{
          color: '#fff',
          backgroundColor: '#101a21',
          resize: 'none',
          border: 'none',
          width: '100%',
          overflow: 'hidden',
          fontSize: '15px',
          marginLeft: '2px',
          maxWidth: `${header ? 'none' : '9rem'}`,
          lineHeight: '20px',
          wordBreak: 'break-word',
        }}
        onBlur={onBlur ? () => onBlur(textareaValue) : undefined}
      />
    </TextareaWrapper>
  );
};
