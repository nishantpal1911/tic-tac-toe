import { Cell, CellValue } from '../types';

interface SquareProps {
  disabled?: boolean;
  cell: Cell;
  player: CellValue;
  onClick: {
    (cell: Cell): void;
  };
}

const styles = {
  fill: {
    WIN: 'bg-green-800',
    HISTORY: {
      X: 'bg-yellow-200',
      O: 'bg-blue-200',
    } as Record<CellValue, string>,
  },
  hover: {
    X: 'hover:bg-yellow-100',
    O: 'hover:bg-blue-100',
  } as Record<CellValue, string>,
};

export default function Square({ cell, player, disabled, onClick }: SquareProps) {
  const cellFillStyle =
    cell.fill === 'WIN' ? styles.fill.WIN
    : cell.fill === 'HISTORY' ? styles.fill.HISTORY[cell.value]
    : '';

  const hoverColor = !disabled ? styles.hover[player] : '';

  return (
    <button
      disabled={disabled}
      onClick={() => onClick(cell)}
      className={`h-14 w-14 border border-gray-700 text-3xl ${cellFillStyle} ${hoverColor}`}
    >
      {cell.value}
    </button>
  );
}
