import { useState } from 'react';
export default function useForm(init) {
  const [values, setValues] = useState(init);
  return [
    values,
    e => {
      const value = e.target.value;
      setValues({
        ...values,
        [e.target.name]: value,
      });
    },
  ];
}
