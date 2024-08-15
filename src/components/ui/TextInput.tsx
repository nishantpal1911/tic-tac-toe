import { ComponentProps, PropsWithChildren, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface InputProps {
  label?: string;
  onChangeValue: {
    (value: string): void;
  };
}

interface Props extends ComponentProps<'input'>, InputProps {}

const generateId = () => `TextInput__${uuidv4()}`;

export default function TextInput(props: PropsWithChildren<Props>) {
  const { children, className, id: propsId, label, onChangeValue, ...restProps } = props;
  const [id, setId] = useState(() => propsId || generateId());

  useEffect(() => {
    setId(propsId || generateId());
  }, [propsId]);

  return (
    <div className='flex flex-col'>
      {label && (
        <label className='mb-2' htmlFor={id}>
          {label}
        </label>
      )}
      <div
        className={`flex h-10 max-h-12 items-center justify-between rounded-md border border-gray-400 bg-white px-3 focus-within:ring-2 ${className || ''}`}
      >
        <input
          className='h-full w-full focus-visible:outline-none'
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
