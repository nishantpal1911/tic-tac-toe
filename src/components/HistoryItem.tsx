import { useState } from 'react';
import RestoreIcon from '@mui/icons-material/Restore';
import SubdirectoryArrowLeftIcon from '@mui/icons-material/SubdirectoryArrowLeft';
import OutsideClickHandler from 'react-outside-click-handler';

import { Cell, CellValue } from '../types';

import Modal from './Modal';

interface HistoryItemProps {
  cell: Cell;
  index: number;
  isLastItem: boolean;
  isAnyItemSelected: boolean;
  onItemSelect: {
    (historyIndex: number): void;
  };
  onItemDeselect: {
    (): void;
  };
  onRestore: {
    (index: number): void;
  };
}

const styles = {
  background: {
    selected: {
      X: 'bg-yellow-200 hover:bg-yellow-100',
      O: 'bg-blue-200 hover:bg-blue-100',
    } as Record<CellValue, string>,
    unselected: {
      X: 'bg-slate-50 hover:bg-yellow-100',
      O: 'bg-slate-50 hover:bg-blue-100',
    } as Record<CellValue, string>,
    defaultLast: {
      X: 'bg-yellow-100',
      O: 'bg-blue-100',
    } as Record<CellValue, string>,
  },
  icon: {
    selected: 'text-red-600',
    unselected: 'invisible',
  },
};

export default function HistoryItem(props: HistoryItemProps) {
  const [isSelected, setIsSelected] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const bgStyleByPlayer =
    isSelected ? styles.background.selected[props.cell.value]
    : props.isLastItem && !props.isAnyItemSelected ? styles.background.defaultLast[props.cell.value]
    : styles.background.unselected[props.cell.value];
  const iconStyle =
    !props.isLastItem ?
      isSelected ? styles.icon.selected
      : styles.icon.unselected
    : '';

  const onRestoreBtnClick = () => {
    setIsResetModalOpen(true);
  };

  const onConfirmRestore = () => {
    setIsSelected(false);
    props.onRestore(props.index);
    setIsResetModalOpen(false);
  };

  const onCancelRestore = () => {
    setIsResetModalOpen(false);
  };

  const onItemSelect = () => {
    if (isSelected) props.onItemDeselect();
    else props.onItemSelect(props.index);

    setIsSelected(!isSelected);
  };

  return (
    <>
      <hr className='h-[1px] border-black' />
      <OutsideClickHandler onOutsideClick={() => setIsSelected(false)}>
        <Modal
          text='Are you sure you want to reset history?'
          isModalOpen={isResetModalOpen}
          onConfirmBtnModal={onConfirmRestore}
          onCancelBtnClick={onCancelRestore}
        />
        <div className={`flex ${bgStyleByPlayer}`}>
          <button onClick={onItemSelect} className={'w-full py-3'}>
            Player {props.cell.value} played at ({props.cell.pos.x} , {props.cell.pos.y})
          </button>
          <button
            className={`px-4 ${iconStyle}`}
            disabled={!isSelected || props.isLastItem}
            onClick={onRestoreBtnClick}
          >
            {props.isLastItem ?
              <SubdirectoryArrowLeftIcon />
            : <RestoreIcon />}
          </button>
        </div>
      </OutsideClickHandler>
    </>
  );
}
