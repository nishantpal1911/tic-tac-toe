import OutsideClickHandler from 'react-outside-click-handler';

import Button from './Button';

interface ModalProps {
  isModalOpen?: boolean;
  text: string;
  onCancelBtnClick: {
    (): void;
  };
  onConfirmBtnModal: {
    (): void;
  };
}

export default function Modal({ text, isModalOpen, onConfirmBtnModal, onCancelBtnClick }: ModalProps) {
  const displayClasses = `modal hidden opacity-0 ${isModalOpen ? 'opacity-100 !block' : ''}`;

  return (
    <>
      {isModalOpen && (
        <div className='fixed left-0 top-0 z-40 h-full w-full bg-black bg-opacity-20 p-4 backdrop-blur-2xs' />
      )}
      <OutsideClickHandler disabled={!isModalOpen} onOutsideClick={onCancelBtnClick}>
        <div
          className={`${displayClasses} fixed left-2/4 top-1/3 z-50 -translate-x-2/4 -translate-y-2/4 rounded-xl border-2 border-gray-300 bg-white`}
        >
          <div className='p-6'>
            <p className='text-lg font-semibold'>{text}</p>
          </div>
          <hr />
          <div className='flex justify-end gap-2 p-6'>
            <Button type='secondary' text='Cancel' onClick={onCancelBtnClick} />
            <Button type='alert' text='Confirm' onClick={onConfirmBtnModal} />
          </div>
        </div>
      </OutsideClickHandler>
    </>
  );
}
