import React, { useState, ChangeEvent } from 'react';

import TextareaAutosize from 'react-textarea-autosize';
import { TextareaWrapper } from '.';

export interface TextareaProps {
  placeholder: string;
  name?: string;
  dataTestid?: string;
  customStyle?: Record<string, string>;
  ariaLabel: string;
  defaultValue?: string | number;
  onBlur?: (textareaValue?: string) => void;
}

export const Textarea: React.FC<
  TextareaProps & {
    forwardedRef?: React.Ref<HTMLTextAreaElement>;
  }
> = ({
  placeholder,
  name,
  ariaLabel,
  defaultValue,
  onBlur,
  customStyle,
  forwardedRef,
  dataTestid,
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
        required
        ref={forwardedRef ?? null}
        value={textareaValue}
        placeholder={placeholder}
        aria-label={ariaLabel}
        data-testid={dataTestid}
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
