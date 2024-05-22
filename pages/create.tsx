import { Button, FormControl, FormHelperText, Input, Link } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import Board from '../components/Board';
import { ButtonsWrapper } from "../components/components";
import RootLayout from "../components/layout";
import '../styles/Home.module.css';
import { defaultBoardSize } from "../utils/app.const";
import { Cell } from "./api/Board.interface";

const Create: FC = () => {
	const [liveCells, setLiveCells] = useState<Cell[]>([]);
	const [error, setError] = useState<string>();
	const [size, setSize] = useState<number>(defaultBoardSize);
	const router = useRouter();

	const createNewBoard = async () => {
		try {
			await axios.post('api/board', { size, liveCells });
			router.push('/');
		} catch (error) {
			setError(error);
		}
	};

	const onCellClicked = (x: number, y: number) => {
		const cellFound = liveCells.findIndex((cell) => cell.x === x && cell.y === y);
		setLiveCells(lastState => {
			if (cellFound === -1) {
				return [...lastState, { x, y }];
			}
			const newArray = [...lastState];
			newArray.splice(cellFound, 1);
			return newArray;
		})
	};

	return <RootLayout>
		<FormControl>
			<FormHelperText>Board size</FormHelperText>
			<Input
				type="number"
				value={size}
				onChange={(ev) => setSize(Number(ev.target.value))} />
		</FormControl>
		<Board
			liveCells={liveCells}
			size={size}
			onCellClick={onCellClicked}
		/>
		<ButtonsWrapper>
			<Button>
				<Link href='/'>Cancel</Link>
			</Button>
			<Button
				onClick={createNewBoard}
			>Create</Button>
		</ButtonsWrapper>
		{
			error &&
			<FormHelperText error={!!error}>
				{error}
			</FormHelperText>
		}
	</RootLayout>
}

export default Create;