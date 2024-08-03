import { cva } from 'class-variance-authority';
import 'overlayscrollbars/styles/overlayscrollbars.css';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import React, { ComponentProps, PropsWithChildren, useEffect, useState } from 'react';

import css from 'src/styles/ui/Dropdown.module.css';

interface DropdownProps {
  className?: string;
  isOpen?: boolean;
  onSelect?: {
    (node: React.ReactNode): void;
  };
}

interface DropdownItemProps extends Omit<ComponentProps<'button'>, 'onSelect'> {
  isSelected?: boolean;
  showBgOnSelected?: boolean;
  onSelect?: {
    (node: React.ReactNode): void;
  };
}

const containerStyles = cva(
  `${css.container} absolute top-1 flex max-h-0 min-w-full flex-col overflow-x-hidden rounded-b-lg bg-white shadow-xl`,
  {
    variants: {
      isOpen: {
        true: 'max-h-64',
      },
    },
  }
);

export function Dropdown(props: PropsWithChildren<DropdownProps>) {
  const [isOpen, setIsOpen] = useState(props.isOpen);

  useEffect(() => {
    if (props.isOpen) {
      setIsOpen(true);
    } else {
      setTimeout(() => setIsOpen(false), 150);
    }
  }, [props.isOpen]);

  return (
    <div className='relative z-[5] h-0'>
      <OverlayScrollbarsComponent
        options={{
          scrollbars: {
            autoHide: 'move',
            autoHideDelay: 100,
          },
        }}
        className={containerStyles({ isOpen: props.isOpen, className: props.className })}
      >
        {isOpen &&
          props.children &&
          (Array.isArray(props.children) ?
            props.children.map((child) => React.cloneElement(child, { onSelect: props.onSelect }))
          : React.cloneElement(props.children as JSX.Element, { onSelct: props.onSelect }))}
      </OverlayScrollbarsComponent>
    </div>
  );
}

const dropdownItemStyles = cva('w-full select-none px-4 py-2 text-start hover:bg-gray-100', {
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

export function DropdownItem(props: PropsWithChildren<DropdownItemProps>) {
  const { children, isSelected, onSelect, showBgOnSelected } = props;

  const selectHandler = () => {
    onSelect?.(props.children);
  };

  return (
    <button
      className={dropdownItemStyles({ isSelected, showBgOnSelected, className: props.className })}
      onClick={selectHandler}
    >
      {children}
    </button>
  );
}
