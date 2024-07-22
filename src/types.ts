export type CellValue = 'X' | 'O' | '';

export interface Cell {
  value: CellValue;
  fill?: 'WIN' | 'HISTORY';
  pos: {
    x: number;
    y: number;
  };
}
