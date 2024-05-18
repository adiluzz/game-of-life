import { Cell } from "./Board.interface";


export default class BoardSingleton {
	size: number;
	liveCells: Cell[];
	states: Cell[][] = [];
	constructor(size: number, liveCells: Cell[]) {
		this.size = size;
		this.validateBoardState(liveCells);
		this.liveCells = liveCells;
		this.states.push(liveCells);
	}

	private validateBoardState(state:Cell[]) {
		for (let i = 0; i < state.length; i++) {
			const cell = state[i];
			if (cell.x > this.size - 1 || cell.y > this.size - 1) {
				throw `Cell with x=${cell.x} and y=${cell.y} is incompatible with board of size ${this.size}`;
			}
		}
	}

	public progressBoard() {
		let liveCells: Cell[] = [];
		const board = [...Array(this.size).fill(Array(this.size).fill(false))];
		const currentState = this.getState();
		for (let i = 0; i < board.length; i++) {
			const row = board[i];
			for (let j = 0; j < row.length; j++) {
				let cellsAlive = 0;
				let isAlive = false;
				for (let k = 0; k < currentState.length; k++) {
					const cell = currentState[k];
					const xDelta = Math.abs(cell.x - j);
					const yDelta = Math.abs(cell.y - i);
					const isSameCell = xDelta === 0 && yDelta === 0;
					if (isSameCell) {
						isAlive = true;
					}
					if (!isSameCell && xDelta <= 1 && yDelta <= 1) {
						cellsAlive++;
					}
				}
				if (
					(isAlive && cellsAlive === 2) ||
					cellsAlive === 3
				) {
					liveCells.push({
						x: j,
						y: i
					});
				}
			}
		}
		this.validateBoardState(liveCells);
		this.states.push(liveCells);
	}

	public getState(stepsBack?: number) {
		return !stepsBack ? this.states[this.states.length - 1] : this.states[this.states.length - stepsBack - 1];
	}

	public reverseSteps(steps:number) {
		this.states.splice(steps * -1);
	}
}