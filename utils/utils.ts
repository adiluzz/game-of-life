import { Cell, CellsHashMap } from "../pages/api/Board.interface";


export const createCellsHashMap = (liveCells: Cell[]): CellsHashMap => {
	return liveCells.reduce((prev, cur) => {
		if (!prev[cur.x]) {
			prev[cur.x] = { [cur.y]: true }
		} else {
			prev[cur.x][cur.y] = true;
		}
		return prev;
	}, {});
}

export const createBoard = (size: number, liveCells: Cell[]): boolean[][] => {
	const hashMap = createCellsHashMap(liveCells);
	const board: boolean[][] = [];
	for (let x = 0; x < size; x++) {
		const row: boolean[] = [];
		for (let y = 0; y < size; y++) {
			row.push(!!hashMap[x] && !!hashMap[x][y])
		}
		board.push(row)
	}
	return board;
}