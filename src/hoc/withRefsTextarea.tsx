import React, { forwardRef, useEffect } from 'react';
import { TextareaProps } from '../components/UI/Textarea/Textarea';

export const withRefTextarea = (
  Component: React.ComponentType<TextareaProps>
) => {
  const WithRefTextarea = (
    props: TextareaProps & {
      forwardedRef: React.RefObject<HTMLTextAreaElement>;
    }
  ) => {
    useEffect(() => {
      const { forwardedRef } = props;
      const ref = forwardedRef.current;
      if (ref) {
        ref.focus();
      }
    }, [props]);
    return <Component {...props} />;
  };

  return forwardRef(WithRefTextarea);
};
