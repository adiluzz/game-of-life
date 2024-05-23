export type Cell = {
	x: number;
	y: number;
	isDead?: boolean;
}

export type CellsHashMap = {
	[x: number]: {
		[y: number]: boolean
	}
}

export type FrontendMode = 'create' | 'edit';

export type BoardResponse = {
	size: number;
	liveCells: Cell[];
	totalSteps: number;
}