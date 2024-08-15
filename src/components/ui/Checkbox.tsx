import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps, PropsWithChildren, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Props extends Omit<ComponentProps<'input'>, 'size'>, VariantProps<typeof styles> {}

const styles = cva('', {
  variants: {
    size: {
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const generateId = () => `Checkbox__${uuidv4()}`;

export default function Checkbox(props: PropsWithChildren<Props>) {
  const { children, className, size, ...restProps } = props;
  const [id, setId] = useState(() => props.id || generateId());

  useEffect(() => {
    setId(props.id || generateId());
  }, [props.id]);

  return (
    <div className={`flex w-fit cursor-pointer items-center gap-3 *:cursor-pointer ${className}`}>
      <input id={id} type='checkbox' className={styles({ size })} {...restProps} />
      {children && (
        <label htmlFor={id} className='select-none'>
          {children}
        </label>
      )}
    </div>
  );
}
