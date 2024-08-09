import { cva } from 'class-variance-authority';
import 'overlayscrollbars/styles/overlayscrollbars.css';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import React, { PropsWithChildren, useEffect, useState } from 'react';

import css from 'src/styles/ui/Dropdown.module.css';

interface Props {
  className?: string;
  isOpen?: boolean;
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

export default function Dropdown(props: PropsWithChildren<Props>) {
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
