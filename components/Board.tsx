import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { Typography } from '@mui/material';
import { FC, useMemo } from "react";
import { Cell } from "../pages/api/Board.interface";
import { createBoard, createCellsHashMap } from "../utils/utils";
import { BoardWrapper, CellComponent, RowComponent } from "./components";

type BoardProps = {
	liveCells: Cell[];
	size: number;
	editable?: boolean;
	onCellClick?: (x: number, y: number) => void;
	title?: string;
}

const Board: FC<BoardProps> = ({ size, liveCells, onCellClick, title }) => {
	const boardData = createBoard(size, liveCells);
	const cellsHasMap = useMemo(() => {
		return createCellsHashMap(liveCells);
	}, [liveCells]);
	return <BoardWrapper>
		{
			title &&
			<Typography variant='h6'>{title}</Typography>
		}
		{
			boardData.map((row, rowIndex) =>
				<RowComponent key={`board-row-${rowIndex}`}>
					{row.map((cell, cellIndex) =>
						<CellComponent
							key={`board-cell-${rowIndex}-${cellIndex}`}
							onClick={onCellClick ? () => onCellClick(rowIndex, cellIndex) : undefined}
							alive={!!cellsHasMap[rowIndex] && !!cellsHasMap[rowIndex][cellIndex] ? 'true' : 'false'}
						>
							{cell ? <DoneIcon /> : <CloseIcon />}
						</CellComponent>
					)}
				</RowComponent>
			)
		}
	</BoardWrapper>
}

export default Board;