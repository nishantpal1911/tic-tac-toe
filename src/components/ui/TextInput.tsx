import { ComponentProps, PropsWithChildren, useEffect, useState } from 'react';

import { randomNumberGenerator } from 'src/utils';

interface InputProps {
  label?: string;
  onChangeValue: {
    (value: string): void;
  };
}

interface Props extends ComponentProps<'input'>, InputProps {}

const generateId = () => `TextInput__${randomNumberGenerator(0, 100000)})`;

export default function TextInput(props: PropsWithChildren<Props>) {
  const { children, className, label, onChangeValue, ...restProps } = props;
  const [id, setId] = useState(props.id || generateId());

  useEffect(() => {
    setId(props.id || generateId());
  }, [props.id]);

  return (
    <div className='flex flex-col'>
      {label && (
        <label className='mb-2' htmlFor={id}>
          {label}
        </label>
      )}
      <div
        className={`flex h-10 max-h-12 items-center justify-between rounded-md border border-gray-400 bg-white px-3 focus-within:ring-2 ${className}`}
      >
        <input
          className='h-full focus-visible:outline-none'
          id={id}
          type='text'
          onChange={({ target }) => onChangeValue(target.value)}
          {...restProps}
        />
        {children}
      </div>
    </div>
  );
}
