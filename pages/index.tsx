import { Button, FormControl, FormHelperText, Input, Link, Switch, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import Board from '../components/Board';
import RootLayout from '../components/layout';
import { BoardResponse, Cell } from './api/Board.interface';
import axios from 'axios';
import { defaultBoardSize } from '../utils/app.const';
import { BoardsWrapper, ButtonsWrapper, ErrorWrapper, SimulateWrapper } from '../components/components';
import BoardSimulation from '../components/BoardSimulation';

export default function Home() {
	const [board, setBoard] = useState<Cell[]>();
	const [error, setError] = useState<string>();
	const [size, setSize] = useState<number>(defaultBoardSize);
	const [simulateMode, setSimulateMode] = useState<boolean>(false);
	const [canGoBack, setCanGoBack] = useState<boolean>(false);

	const boardActionSuccess = (res: BoardResponse) => {
		setBoard(res.liveCells);
		setSize(res.size);
		setError(undefined);
		setCanGoBack(res.totalSteps > 1);
	};

	const getBoard = useCallback(async () => {
		try {
			const boardResponse = await axios.get<BoardResponse>('api/board');
			boardActionSuccess(boardResponse.data);
		} catch (error) {
			setBoard(undefined);
			setError(error.response.data);
		}
	}, []);

	const progressBoard = async () => {
		try {
			const res = await axios.put<BoardResponse>('api/board');
			boardActionSuccess(res.data);
		} catch (error) {
			setError(error.response.data);
		}
	};

	const deleteLastGeneration = async () => {
		try {
			const res = await axios.delete<BoardResponse>('api/board', { data: { steps: 1 } });
			boardActionSuccess(res.data);
		} catch (error) {
			setError(error.response.data);
		}
	}

	useEffect(() => {
		getBoard();
	}, [getBoard]);

	return (
		<RootLayout>
			<ErrorWrapper error={!!error}>
				{error}
			</ErrorWrapper>
			{
				board &&
				<BoardsWrapper>
					<Board
						liveCells={board}
						size={size}
						title='Current game board'
					/>
					<SimulateWrapper>
						{
							simulateMode &&
							<BoardSimulation size={size} />
						}
					</SimulateWrapper>
				</BoardsWrapper>
			}
			<ButtonsWrapper>
				{
					board &&
					<>
						<Button disabled={!canGoBack} onClick={deleteLastGeneration}>Go Back</Button>
						<Button onClick={progressBoard}>Progress Board</Button>
					</>
				}
				<Button>
					<Link href={'./create'}>Create new board</Link>
				</Button>
			</ButtonsWrapper>
			{
				board &&
				<ButtonsWrapper>
					<Typography color='primary'>Simulate progress mode</Typography>
					<Switch
						checked={simulateMode}
						onChange={() => {
							setSimulateMode(!simulateMode);
						}}
					/>
				</ButtonsWrapper>
			}
		</RootLayout>
	);
}
