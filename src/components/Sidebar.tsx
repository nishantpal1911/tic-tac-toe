import { ReactNode, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

interface SidebarProps {
  children: ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const width = isExpanded ? 'w-72' : 'w-14';
  const contentDisplayClasses = `sidebar-content hidden flex-col opacity-0 ${isExpanded ? 'opacity-100 !flex' : ''}`;

  return (
    <div className={`sidebar absolute right-0 top-0 z-10 flex h-lvh flex-col bg-slate-200 shadow-xl ${width}`}>
      <button className='my-5 ml-auto mr-5 flex h-fit' onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ?
          <CloseIcon />
        : <MenuIcon />}
      </button>
      <div className={`${contentDisplayClasses} overflow-y-auto overflow-x-hidden`}>{children}</div>
    </div>
  );
}
