import { cva } from 'class-variance-authority';
import { ComponentProps, PropsWithChildren } from 'react';

interface Props extends Omit<ComponentProps<'button'>, 'onSelect'> {
  isSelected?: boolean;
  showBgOnSelected?: boolean;
  onSelect?: {
    (node: React.ReactNode): void;
  };
}

const styles = cva('w-full select-none px-4 py-2 text-start hover:bg-gray-100', {
  variants: {
    showBgOnSelected: { true: '' },
    isSelected: { true: '' },
  },
  compoundVariants: [
    {
      showBgOnSelected: true,
      isSelected: true,
      className: 'bg-gray-100',
    },
  ],
});

export default function DropdownItem(props: PropsWithChildren<Props>) {
  const { children, isSelected, onSelect, showBgOnSelected } = props;

  const selectHandler = () => {
    onSelect?.(props.children);
  };

  return (
    <button className={styles({ isSelected, showBgOnSelected, className: props.className })} onClick={selectHandler}>
      {children}
    </button>
  );
}
