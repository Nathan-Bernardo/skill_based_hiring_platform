import React, { useState } from 'react';

export const useForm = <T>(initialState: T): [T, (e: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [values, setValues] = useState(initialState);

  return [values, (e): void => setValues({ ...values, [e.target.name]: e.target.value })];
};
