import _ from 'lodash';
import { useState } from 'react';

import History from 'src/components/History';
import Square from 'src/components/Square';
import Sidebar from 'src/components/ui/Sidebar';
import { Cell, CellValue } from 'src/types';

interface BoardProps {
  N: number;
  setIsPlayed: {
    (): void;
  };
}

const getInitialBoard = (n: number): Cell[][] =>
  Array(n)
    .fill([])
    .map((_, rowInd) =>
      Array(n)
        .fill('')
        .map((_, colInd) => ({ value: '', pos: { x: rowInd, y: colInd } }) as Cell)
    );

const playsInARowToWin: Record<number, number> = {
  3: 3,
  4: 3,
  5: 3,
  6: 4,
  7: 4,
  8: 4,
  9: 5,
  10: 5,
};

export default function Board({ N, setIsPlayed }: BoardProps) {
  const [board, setBoard] = useState(getInitialBoard(N));
  const [tempBoard, setTempBoard] = useState(null as Cell[][] | null);
  const [nextPlayer, setNextPlayer] = useState('X' as CellValue);
  const [history, setHistory] = useState([] as Cell[]);
  const [winner, setWinner] = useState('' as CellValue);
  const isDisabled = !!winner || history.length === N * N || !!tempBoard;

  const checkRow = (cell: Cell, newBoard: Cell[][], fillCells?: boolean): boolean => {
    const { x, y } = cell.pos;
    let count = 1;
    // Left
    for (let j = y - 1; j >= 0 && board[x][j].value === nextPlayer; j--) {
      count++;
      if (fillCells) newBoard[x][j].fill = 'WIN';
    }
    // Right
    for (let j = y + 1; j < N && board[x][j].value === nextPlayer; j++) {
      count++;
      if (fillCells) newBoard[x][j].fill = 'WIN';
    }
    const isGameWon = count >= playsInARowToWin[N];
    if (isGameWon && !fillCells) return checkRow(cell, newBoard, true);

    return isGameWon;
  };

  const checkColumn = (cell: Cell, newBoard: Cell[][], fillCells?: boolean): boolean => {
    const { x, y } = cell.pos;
    let count = 1;
    // Up
    for (let i = x - 1; i >= 0 && board[i][y].value === nextPlayer; i--) {
      count++;
      if (fillCells) newBoard[i][y].fill = 'WIN';
    }
    // Down
    for (let i = x + 1; i < N && board[i][y].value === nextPlayer; i++) {
      count++;
      if (fillCells) newBoard[i][y].fill = 'WIN';
    }
    const isGameWon = count >= playsInARowToWin[N];
    if (isGameWon && !fillCells) return checkColumn(cell, newBoard, true);

    return isGameWon;
  };

  const checkDiagonal = (cell: Cell, newBoard: Cell[][], fillCells?: boolean): boolean => {
    const { x, y } = cell.pos;
    let count = 1;
    // Top-Left
    for (let i = x - 1, j = y - 1; i >= 0 && j >= 0 && board[i][j].value === nextPlayer; i--, j--) {
      count++;
      if (fillCells) newBoard[i][j].fill = 'WIN';
    }
    // Bottom-Right
    for (let i = x + 1, j = y + 1; i < N && j < N && board[i][j].value === nextPlayer; i++, j++) {
      count++;
      if (fillCells) newBoard[i][j].fill = 'WIN';
    }
    const isGameWon = count >= playsInARowToWin[N];
    if (isGameWon && !fillCells) return checkDiagonal(cell, newBoard, true);

    return isGameWon;
  };

  const checkAntiDiagonal = (cell: Cell, newBoard: Cell[][], fillCells?: boolean): boolean => {
    const { x, y } = cell.pos;
    let count = 1;
    // Top-Right
    for (let i = x - 1, j = y + 1; i >= 0 && j < N && board[i][j].value === nextPlayer; i--, j++) {
      count++;
      if (fillCells) newBoard[i][j].fill = 'WIN';
    }
    // Bottom-Left
    for (let i = x + 1, j = y - 1; i < N && j >= 0 && board[i][j].value === nextPlayer; i++, j--) {
      count++;
      if (fillCells) newBoard[i][j].fill = 'WIN';
    }
    const isGameWon = count >= playsInARowToWin[N];
    if (isGameWon && !fillCells) return checkAntiDiagonal(cell, newBoard, true);

    return isGameWon;
  };

  const checkWinnerAndFillCells = (cell: Cell, newBoard: Cell[][]): boolean => {
    return (
      checkRow(cell, newBoard) ||
      checkColumn(cell, newBoard) ||
      checkDiagonal(cell, newBoard) ||
      checkAntiDiagonal(cell, newBoard)
    );
  };

  const handleNextMove = (playedCell: Cell) => {
    if (isDisabled || playedCell.value) return;

    // Set player move
    const newBoard = _.cloneDeep(board);
    const isGameWon = checkWinnerAndFillCells(playedCell, newBoard);
    const { x, y } = playedCell.pos;

    if (isGameWon) {
      newBoard[x][y].fill = 'WIN';
      setWinner(nextPlayer);
    } else {
      setNextPlayer(nextPlayer === 'X' ? 'O' : 'X');
    }
    newBoard[x][y].value = nextPlayer;
    setBoard(newBoard);
    setHistory([...history, newBoard[x][y]]);
    setIsPlayed();
  };

  const onHistoryItemSelect = (historyIndex: number) => {
    const newBoard = _.cloneDeep(board);
    let index = 0;
    while (index < historyIndex) {
      const cell = history[index];
      newBoard[cell.pos.x][cell.pos.y] = {
        ...cell,
        fill: undefined,
      };
      index++;
    }

    const currentCell = history[index++];
    newBoard[currentCell.pos.x][currentCell.pos.y].fill = 'HISTORY';

    while (index < history.length) {
      const cell = history[index];
      newBoard[cell.pos.x][cell.pos.y] = {
        ...cell,
        fill: undefined,
        value: '',
      };
      index++;
    }

    setTempBoard(newBoard);
  };

  const onClickOutsideHistory = () => {
    setTimeout(() => setTempBoard(null), 0);
  };

  const onHistoryRestore = (index: number) => {
    if (!tempBoard) return;

    const cell = history[index];
    const newBoard = _.cloneDeep(tempBoard);
    newBoard[cell.pos.x][cell.pos.y].fill = undefined;

    setNextPlayer(cell.value === 'O' ? 'X' : 'O');
    setBoard(newBoard);
    setHistory(history.slice(0, index + 1));
    setTempBoard(null);
    setWinner('');
  };

  return (
    <>
      <Sidebar>
        <History
          history={history}
          onItemSelect={onHistoryItemSelect}
          onRestore={onHistoryRestore}
          onClickOutside={onClickOutsideHistory}
        />
      </Sidebar>
      <div className='flex flex-col items-center'>
        <h2 className='mb-4 text-xl font-bold'>
          {winner ?
            `Winner: ${winner} 🎉`
          : history.length === N * N ?
            "It's a draw 😒"
          : `Next turn: ${nextPlayer}`}
        </h2>
        <h4 className='mb-4 text-lg'>{!winner && `Get ${playsInARowToWin[N]} "${nextPlayer}" in a row to win.`}</h4>
        <div className={`flex flex-col ${winner && 'cursor-auto'}`}>
          {(tempBoard || board).map((row, rowIndex) => (
            <div className='flex' key={rowIndex}>
              {row.map((cell, colIndex) => (
                <Square
                  disabled={isDisabled || !!cell.value}
                  nextPlayer={nextPlayer}
                  cell={cell}
                  key={`${rowIndex}.${colIndex}`}
                  onClick={handleNextMove}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
