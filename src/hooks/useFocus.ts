import { RefObject, useRef } from 'react';

export const useFocus = (): [RefObject<HTMLInputElement>, () => void] => {
  const htmlElRef = useRef<HTMLInputElement>(null);
  const setFocus = (): void => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};
