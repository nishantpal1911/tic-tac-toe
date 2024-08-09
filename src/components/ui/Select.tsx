import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import Button from 'src/components/ui/Button';
import { randomNumberGenerator } from 'src/utils';

interface Props {
  id?: string;
  label?: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  selectedOption?: string;
  placeholder?: string;
  disabled?: boolean;
  collapseOnSelect?: boolean;
  onSelect?: {
    (node: React.ReactNode): void;
  };
}

const generateId = () => `Select__${randomNumberGenerator(0, 100000)})`;

export default function Select(props: PropsWithChildren<Props>) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [id, setId] = useState(props.id || generateId());

  useEffect(() => {
    setId(props.id || generateId());
  }, [props.id]);

  const selectClickHandler = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOutsideClick = () => {
    setIsDropdownOpen(false);
  };

  const itemSelectHandler = (node: React.ReactNode) => {
    props.onSelect?.(node);
    if (props.collapseOnSelect) setIsDropdownOpen(false);
  };

  return (
    <div>
      {props.label && (
        <label className='pointer-events-none mb-2 inline-block' htmlFor={id}>
          {props.label}
        </label>
      )}

      <div className='w-min'>
        <OutsideClickHandler onOutsideClick={handleOutsideClick}>
          <Button
            id={id}
            intent='plainSecondary'
            size={props.size || 'md'}
            icon={{
              svg: isDropdownOpen ? ArrowDropUpIcon : ArrowDropDownIcon,
              placement: 'right',
              styles: { fontSize: 'medium' },
            }}
            onClick={selectClickHandler}
            className={`justify-between bg-white pl-4 pr-2 ${props.className}`}
            disabled={props.disabled}
          >
            {props.selectedOption ?
              <span>{props.selectedOption}</span>
            : <span>{props.placeholder || 'Select option'}</span>}
          </Button>
          {props.children && (
            <>
              {React.cloneElement(props.children as JSX.Element, {
                isOpen: isDropdownOpen,
                onSelect: itemSelectHandler,
              })}
            </>
          )}
        </OutsideClickHandler>
      </div>
    </div>
  );
}
