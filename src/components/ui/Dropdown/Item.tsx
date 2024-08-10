import { cva } from 'class-variance-authority';
import { ComponentProps, PropsWithChildren } from 'react';

interface Props extends Omit<ComponentProps<'button'>, 'onSelect'> {
  isSelected?: boolean;
  showBgOnSelected?: boolean;
  onSelect?: {
    (node: React.ReactNode): void;
  };
}

const styles = cva('w-full select-none px-4 py-2 text-start hover:bg-gray-50', {
  variants: {
    showBgOnSelected: { true: '' },
    isSelected: { true: '' },
  },
  compoundVariants: [
    {
      showBgOnSelected: true,
      isSelected: true,
      className: 'border-l-2 border-blue-200 bg-blue-50 pl-3.5 hover:bg-blue-50',
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
