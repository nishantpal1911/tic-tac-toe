import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { cva } from 'class-variance-authority';
import { ReactNode, useEffect, useState } from 'react';

import Button from 'src/components/ui/Button';
import css from 'src/styles/ui/Sidebar.module.css';

interface SidebarProps {
  children: ReactNode;
}

const containerStyles = cva(
  `${css.sidebar} fixed bottom-0 left-0 top-0 z-10 flex min-h-lvh w-14 flex-col bg-slate-200 shadow-xl`,
  {
    variants: {
      isExpanded: {
        true: 'w-72',
      },
    },
  }
);

const contentStyles = cva(`${css.content} flex flex-col overflow-y-auto overflow-x-hidden opacity-0`, {
  variants: {
    isExpanded: {
      true: '!opacity-100',
    },
  },
});

export default function Sidebar({ children }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    if (!isExpanded) {
      setIsContentVisible(false);
    } else {
      setTimeout(() => {
        setIsContentVisible(true);
      }, 300);
    }
  }, [isExpanded]);

  return (
    <div className={containerStyles({ isExpanded })}>
      <Button
        intent='plainIcon'
        icon={{ svg: isExpanded ? CloseIcon : MenuIcon, styles: { fontSize: 'medium' } }}
        onClick={() => setIsExpanded(!isExpanded)}
        className='my-5 ml-auto mr-5'
      />
      <div className={contentStyles({ isExpanded })}>{isContentVisible && children}</div>
    </div>
  );
}
