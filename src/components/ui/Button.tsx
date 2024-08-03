import { SvgIcon, SvgIconProps } from '@mui/material';
import { cva, VariantProps } from 'class-variance-authority';
import React, { ComponentProps } from 'react';

import css from 'src/styles/ui/Button.module.css';

interface ButtonProps {
  text?: string;
  icon?: {
    svg: typeof SvgIcon;
    placement?: 'left' | 'right';
    styles?: SvgIconProps;
  };
}

interface Props
  extends ComponentProps<'button'>,
    Omit<VariantProps<typeof btnStyles>, 'disabled' | 'icon' | 'iconPlacement'>,
    ButtonProps {}

const btnStyles = cva(
  `${css.transition} rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-1`,
  {
    variants: {
      intent: {
        primary: 'bg-yellow-400/75 text-black/85 shadow hover:bg-yellow-400 hover:text-black',
        secondary:
          'text-yellow-500 ring-1 ring-yellow-500 hover:bg-yellow-400/[0.05] hover:text-yellow-600 hover:ring-yellow-600',
        plainSecondary:
          'text-gray-500 ring-1 ring-gray-400 hover:bg-gray-400/[0.05] hover:text-gray-600 hover:ring-gray-600',
        danger: 'bg-red-500/85 text-white shadow hover:bg-red-500',
        plainIcon: 'px-2 focus:!ring-0 focus:!ring-offset-0',
        plainText: '',
      },
      fullWidth: {
        true: 'w-full',
      },
      size: {
        xs: 'p-2 text-xs',
        sm: 'px-3 py-2 text-sm',
        md: 'px-3 py-2',
        lg: 'px-4 py-2 text-lg',
      },
      icon: {
        true: 'flex items-end gap-1',
      },
      iconPlacement: {
        left: '',
        right: 'flex-row-reverse',
      },
      disabled: {
        true: '!bg-gray-100 !text-gray-400 !shadow-none !ring-0',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'md',
      iconPlacement: 'left',
    },
  }
);

export default function Button(props: Props) {
  const { children, className, disabled, fullWidth, icon, intent, onClick, size, text, ...restProps } = props;

  return (
    <button
      className={btnStyles({
        intent,
        icon: !!icon,
        iconPlacement: icon?.placement,
        fullWidth,
        disabled,
        size,
        className: `${className} select-none`,
      })}
      disabled={disabled}
      onClick={onClick}
      {...restProps}
    >
      {icon &&
        React.createElement(icon.svg, {
          fontSize: ['lg'].includes(size || 'md') ? 'medium' : 'small',
          ...icon.styles,
        })}
      {text}
      {children}
    </button>
  );
}
