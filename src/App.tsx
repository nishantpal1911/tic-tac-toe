import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ReplayIcon from '@mui/icons-material/Replay';
import { useContext, useState } from 'react';

import Board from 'src/components/Board';
import Button from 'src/components/ui/Button';
import { Dropdown, DropdownItem } from 'src/components/ui/Dropdown';
import Modal from 'src/components/ui/Modal';
import Select from 'src/components/ui/Select';
import ToastContext from 'src/context/toast';

const boardWidthOptions = [3, 4, 5, 6, 7, 8, 9, 10];

export default function App() {
  const [input, setInput] = useState('3');
  const [boardWidth, setBoardWidth] = useState(3);
  const [isError, setIsError] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isPlayed, setIsPlayed] = useState(false);
  const [boardKey, setBoardKey] = useState(0);
  const toast = useContext(ToastContext);

  const onSelectNum = (node: React.ReactNode) => {
    const value = node as string;
    setInput(value);
    const numValue = Number(value);
    const isError = !value || isNaN(numValue) || !boardWidthOptions.includes(numValue);
    setIsError(isError);
  };

  const onClickApplyButton = () => {
    if (!isPlayed) {
      setBoardWidth(Number(input));
      setBoardKey(boardKey + 1);
      toast.add({ message: 'Board width changed successfully!', type: 'success' });
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
        toast.add({ message: 'Board width changed successfully!', type: 'success' });
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
        setInput(String(boardWidth));
        toast.add({ message: 'Board has been reset!', type: 'info' });
      },
      CANCEL: () => {
        setIsResetModalOpen(false);
      },
    },
  };

  return (
    <div className='relative min-h-lvh bg-slate-50'>
      <Modal
        header='Change board width'
        isOpen={isConfirmModalOpen}
        onConfirm={MODAL_CALLBACKS.APPLY.CONFIRM}
        onDismiss={MODAL_CALLBACKS.APPLY.CANCEL}
      >
        Are you sure you want to change the board width? Your current progress will be lost.
      </Modal>
      <Modal
        header='Reset board'
        isOpen={isResetModalOpen}
        onConfirm={MODAL_CALLBACKS.RESET.CONFIRM}
        onDismiss={MODAL_CALLBACKS.RESET.CANCEL}
      >
        Are you sure you want to reset the board?
      </Modal>
      <main className='flex'>
        <div className='mx-auto w-fit py-16'>
          <div className='mb-6 flex items-center justify-center gap-3'>
            <div>
              <Select
                label='Select board width'
                className='w-20'
                selectedOption={input}
                onSelect={onSelectNum}
                collapseOnSelect
              >
                <Dropdown showBgOnSelected={true}>
                  {boardWidthOptions.map((value, index) => (
                    <DropdownItem key={index} isSelected={value === Number(input)}>
                      {value}
                    </DropdownItem>
                  ))}
                </Dropdown>
              </Select>
              <p className={`text-red-500 ${!isError && 'invisible'}`}>Invalid input!</p>
            </div>
            <div className='mt-2 flex w-fit justify-evenly gap-2'>
              <Button
                icon={{ svg: ReplayIcon }}
                disabled={!isPlayed}
                intent='secondary'
                onClick={() => setIsResetModalOpen(true)}
              >
                Reset
              </Button>
              <Button
                icon={{ svg: CheckCircleOutlineIcon, placement: 'right' }}
                disabled={isError || boardWidth === Number(input)}
                intent='primary'
                onClick={onClickApplyButton}
              >
                Apply
              </Button>
            </div>
          </div>

          <Board key={boardKey} N={boardWidth} setIsPlayed={() => setIsPlayed(true)} />
        </div>
      </main>
    </div>
  );
}
