import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import { Cell } from '../types';

import HistoryItem from './HistoryItem';

interface HistoryProps {
  history: Cell[];
  onItemSelect: {
    (historyIndex: number): void;
  };
  onRestore: {
    (index: number): void;
  };
  onClickOutside: {
    (): void;
  };
}

export default function History(props: HistoryProps) {
  const [isAnyItemSelected, setIsAnyItemSelected] = useState(false);

  const onItemSelect = (index: number) => {
    props.onItemSelect(index);
    setIsAnyItemSelected(true);
  };

  const onClickOutside = () => {
    setIsAnyItemSelected(false);
    props.onClickOutside();
  };

  const onRestore = (index: number) => {
    setIsAnyItemSelected(false);
    props.onRestore(index);
  };

  return (
    <OutsideClickHandler onOutsideClick={onClickOutside}>
      {props.history.map((cell, index) => (
        <HistoryItem
          key={index}
          index={index}
          cell={cell}
          onItemSelect={onItemSelect}
          onItemDeselect={onClickOutside}
          onRestore={onRestore}
          isAnyItemSelected={isAnyItemSelected}
          isLastItem={index === props.history.length - 1}
        />
      ))}
    </OutsideClickHandler>
  );
}
