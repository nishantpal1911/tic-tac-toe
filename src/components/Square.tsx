import { cva } from 'class-variance-authority';

import { Cell, CellValue } from 'src/types';

interface SquareProps {
  disabled?: boolean;
  cell: Cell;
  nextPlayer: CellValue;
  onClick: {
    (cell: Cell): void;
  };
}

const styles = cva('h-14 w-14 border border-gray-700 text-3xl', {
  variants: {
    fill: { WIN: 'bg-green-800', HISTORY: '' },
    player: { X: '', O: '', '': '' },
    disabled: { true: '' },
  },
  compoundVariants: [
    { fill: 'HISTORY', player: 'X', className: 'bg-yellow-200' },
    { fill: 'HISTORY', player: 'O', className: 'bg-blue-200' },
    { disabled: false, fill: undefined, player: 'X', className: 'hover:bg-yellow-100' },
    { disabled: false, fill: undefined, player: 'O', className: 'hover:bg-blue-100' },
  ],
});

export default function Square({ cell, disabled, nextPlayer, onClick }: SquareProps) {
  const player = cell.fill === 'HISTORY' ? cell.value : nextPlayer;

  return (
    <button disabled={disabled} onClick={() => onClick(cell)} className={styles({ fill: cell.fill, disabled, player })}>
      {cell.value}
    </button>
  );
}
