interface ButtonProps {
  className?: string;
  disabled?: boolean;
  type: 'primary' | 'secondary' | 'tertiary' | 'alert';
  text: string;
  onClick: {
    (): void;
  };
}

const buttonStyles = {
  primary: 'bg-yellow-400 hover:bg-yellow-300 font-semibold',
  secondary: 'hover:bg-slate-50 shadow-sm ring-1 ring-yellow-400 ring-slate-700/10',
  tertiary: '',
  alert: 'bg-red-500 text-white hover:bg-red-400',
  disabled: '!bg-gray-100 !ring-0 !text-gray-400',
  '': '',
};

export default function Button(props: ButtonProps) {
  const { className, disabled, type, text, onClick } = props;
  const additionalClasses = `${buttonStyles[type]} ${buttonStyles[disabled ? 'disabled' : '']} ${className || ''}`;

  return (
    <button className={`rounded-md px-4 py-2 text-sm ${additionalClasses}`} disabled={disabled} onClick={onClick}>
      <span>{text}</span>
    </button>
  );
}
