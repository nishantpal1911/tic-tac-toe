import CloseIcon from '@mui/icons-material/Close';
import { cva } from 'class-variance-authority';
import { PropsWithChildren, useEffect, useState } from 'react';

import Button from 'src/components/ui/Button';
import css from 'src/styles/ui/Modal.module.css';

interface ModalProps {
  isModalOpen?: boolean;
  headerText?: string;
  onCancelBtnClick: {
    (): void;
  };
  onConfirmBtnClick: {
    (): void;
  };
}

const modalStyles = cva(
  `${css.transition} fixed left-2/4 top-1/3 z-50 hidden min-w-72 -translate-x-2/4 -translate-y-2/4 rounded-xl border-2 border-gray-300 bg-white px-6 py-4 opacity-0`,
  {
    variants: {
      isModalOpen: {
        true: '!block opacity-100',
      },
    },
  }
);

export default function Modal(props: PropsWithChildren<ModalProps>) {
  const [isModalOpen, setIsModalOpen] = useState(props.isModalOpen);

  useEffect(() => {
    if (props.isModalOpen) {
      setIsModalOpen(true);
    } else {
      setTimeout(() => {
        setIsModalOpen(false);
      }, 250);
    }
  }, [props.isModalOpen]);

  return (
    isModalOpen && (
      <>
        <div className='fixed left-0 top-0 z-40 h-full w-full bg-black bg-opacity-20 p-4 backdrop-blur-2xs' />
        <div className={modalStyles({ isModalOpen: props.isModalOpen })}>
          <div className='flex select-none items-center justify-between gap-4 pb-4'>
            <h2 className='text-xl font-bold text-gray-800'>{props.headerText}</h2>
            <Button
              intent='plainIcon'
              icon={{ svg: CloseIcon, styles: { color: 'action' } }}
              className='hover:bg-gray-200/60'
              onClick={props.onCancelBtnClick}
            />
          </div>
          <div>{props.children}</div>
          <div className='pt-4'>
            <hr />
            <div className='flex justify-end gap-3 pt-4'>
              <Button intent='secondary' size='sm' onClick={props.onCancelBtnClick}>
                Cancel
              </Button>
              <Button intent='danger' size='sm' onClick={props.onConfirmBtnClick}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </>
    )
  );
}
