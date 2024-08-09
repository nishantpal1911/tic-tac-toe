import CloseIcon from '@mui/icons-material/Close';
import { cva } from 'class-variance-authority';
import { PropsWithChildren, useEffect, useState } from 'react';

import Button from 'src/components/ui/Button';
import css from 'src/styles/ui/Modal.module.css';

interface Props {
  isOpen: boolean;
  header?: string;
  onDismiss: {
    (): void;
  };
  onConfirm: {
    (): void;
  };
}

const styles = cva(
  `${css.transition} fixed left-0 top-0 z-40 h-full w-full bg-black bg-opacity-20 p-4 opacity-0 backdrop-blur-2xs`,
  {
    variants: {
      isVisible: {
        true: 'opacity-100',
      },
    },
  }
);

export default function Modal(props: PropsWithChildren<Props>) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (props.isOpen) {
      setIsVisible(props.isOpen);
    } else {
      setTimeout(() => {
        setIsVisible(props.isOpen);
      }, 200);
    }
  }, [props.isOpen]);

  return (
    (props.isOpen || isVisible) && (
      <>
        <div className={styles({ isVisible: props.isOpen && isVisible })}>
          <div className='fixed left-2/4 top-1/3 z-50 h-auto w-auto min-w-72 -translate-x-2/4 -translate-y-2/4 rounded-xl border-2 border-gray-300 bg-white px-6 py-4'>
            <div className='flex select-none items-center justify-between gap-4 pb-4'>
              <h2 className='text-xl font-bold text-gray-800'>{props.header}</h2>
              <Button
                intent='plainIcon'
                size='lg'
                icon={{ svg: CloseIcon, styles: { color: 'action' } }}
                className='!px-2 hover:bg-gray-200/60'
                onClick={props.onDismiss}
              />
            </div>
            <div>{props.children}</div>
            <div className='pt-4'>
              <hr />
              <div className='flex justify-end gap-3 pt-4'>
                <Button intent='secondary' size='sm' onClick={props.onDismiss}>
                  Cancel
                </Button>
                <Button intent='danger' size='sm' onClick={props.onConfirm}>
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}
