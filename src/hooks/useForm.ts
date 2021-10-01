import { ChangeEvent, useState } from 'react';

/*
  Returns 4 values
  0: values
  1: handleChange, can be inserted directly into onChange functions
  2: resetValues, resets all values to an empty string. Used when using only string values OR when exiting the component
  3: manualSet: used to set more complex values like arrays or objects with a key/value pair
*/

export const useForm = <T>(
  initialState: T,
): [T, (e: ChangeEvent<HTMLInputElement>) => void, () => void, (key: keyof T, value: T[keyof T]) => void] => {
  const [values, setValues] = useState<T>(initialState);

  return [
    values,
    (e): void => {
      setValues({ ...values, [e.target.name]: e.target.value });
    },
    (): void => {
      setValues({
        ...values,
        ...Object.keys(values).reduce((newValues, key) => ({ ...newValues, [key]: '' }), {}),
      });
    },
    (key, value): void => {
      setValues({
        ...values,
        [key]: value,
      });
    },
  ];
};
