import { Button, FormControl, FormHelperText, Input } from "@mui/material";
import axios from "axios";
import { FC, useState } from "react";
import { BoardResponse, Cell } from "../pages/api/Board.interface";
import Board from "./Board";
import { SimulationActionsWrapper } from "./components";


const BoardSimulation: FC<{ size: number }> = ({ size }) => {
	const [generations, setGenerations] = useState<number>();
	const [board, setBoard] = useState<Cell[]>();
	const [error, setError] = useState<string>();
	const getSimulatedBoard = async () => {
		try {
			const boardResponse = await axios.get<BoardResponse>(`api/board?generations=${generations}`);
			setBoard(boardResponse.data.liveCells);
			setError(undefined);
		} catch (error) {
			setBoard(undefined);
			setError(error.response.data);
		}
	};
	return <div>
		{
			board &&
			<Board
				liveCells={board}
				size={size}
				title="Simulation board"
			/>
		}
		<FormHelperText error={!!error}>{error}</FormHelperText>
		<SimulationActionsWrapper>
			<FormControl>
				<FormHelperText>Simulate generations ahead (number of generations)</FormHelperText>
				<Input type='number' value={generations} onChange={(ev) => setGenerations(Number(ev.target.value))} />
			</FormControl>
			<Button onClick={() => getSimulatedBoard()}>Simulate</Button>
		</SimulationActionsWrapper>
	</div>
};

export default BoardSimulation;