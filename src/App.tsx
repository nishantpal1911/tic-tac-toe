import { useState } from 'react';

import Board from './components/Board';
import Modal from './components/Modal';
import Button from './components/Button';

export default function App() {
  const [input, setInput] = useState('3');
  const [boardWidth, setBoardWidth] = useState(3);
  const [isError, setIsError] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isPlayed, setIsPlayed] = useState(false);
  const [boardKey, setBoardKey] = useState(0);

  const onChangeNum = (value: string) => {
    setInput(value);
    const numValue = Number(value);
    const isError = !value || isNaN(numValue) || numValue < 3 || numValue > 10;
    setIsError(isError);
  };

  const onClickApplyButton = () => {
    if (!isPlayed) {
      setBoardWidth(Number(input));
      setBoardKey(boardKey + 1);
    } else {
      setIsConfirmModalOpen(true);
    }
  };

  const MODAL_CALLBACKS = {
    APPLY: {
      CONFIRM: () => {
        setBoardWidth(Number(input));
        setBoardKey(boardKey + 1);
        setIsPlayed(false);
        setIsConfirmModalOpen(false);
      },
      CANCEL: () => {
        setIsConfirmModalOpen(false);
      },
    },
    RESET: {
      CONFIRM: () => {
        setBoardKey(boardKey + 1);
        setIsResetModalOpen(false);
        setIsPlayed(false);
      },
      CANCEL: () => {
        setIsResetModalOpen(false);
      },
    },
  };

  return (
    <div className='relative h-svh'>
      <Modal
        text='Are you sure you want to change the board width? Your current progress will be lost.'
        isModalOpen={isConfirmModalOpen}
        onConfirmBtnModal={MODAL_CALLBACKS.APPLY.CONFIRM}
        onCancelBtnClick={MODAL_CALLBACKS.APPLY.CANCEL}
      />
      <Modal
        text='Are you sure you want to reset the board?'
        isModalOpen={isResetModalOpen}
        onConfirmBtnModal={MODAL_CALLBACKS.RESET.CONFIRM}
        onCancelBtnClick={MODAL_CALLBACKS.RESET.CANCEL}
      />
      <main className='flex'>
        <div className='mx-auto w-fit py-16'>
          <div className='mb-6 flex flex-col'>
            <label className='mb-2 text-center text-lg'>Enter a number between 3 and 10</label>
            <div className='m-auto w-fit'>
              <div className='flex h-9'>
                <input
                  className='mr-2 rounded-md border border-gray-400 p-2 focus-visible:outline-yellow-300'
                  type='text'
                  value={input}
                  onChange={({ target }) => onChangeNum(target.value)}
                />
                <div className='flex justify-evenly gap-2'>
                  <Button
                    text='Reset'
                    disabled={!isPlayed}
                    type='secondary'
                    onClick={() => setIsResetModalOpen(true)}
                  />
                  <Button
                    text='Apply'
                    disabled={isError || boardWidth === Number(input)}
                    type='primary'
                    onClick={onClickApplyButton}
                  />
                </div>
              </div>
              <p className={`text-red-500 ${!isError && 'invisible'}`}>Invalid input!</p>
            </div>
          </div>

          <Board key={boardKey} N={boardWidth} setIsPlayed={() => setIsPlayed(true)} />
        </div>
      </main>
    </div>
  );
}
