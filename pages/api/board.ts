import { NextApiRequest, NextApiResponse } from "next";
import BoardSingleton from "./BoardSingleton";
import { Cell } from "./Board.interface";

let currentBoard: BoardSingleton;

export default function handler(req: NextApiRequest, res: NextApiResponse<Cell[]>) {

	if (req.method === 'POST') {
		try {
			currentBoard = new BoardSingleton(req.body.size, req.body.liveCells);
			return res.status(200).json(currentBoard.getState());
		} catch (error) {
			return res.status(400).end(error);
		}
	} 
	
	if (!currentBoard) {
		return res.status(400).end('No current board');
	}

	if (req.method === 'GET') {
		let returnBoard: BoardSingleton = new BoardSingleton(currentBoard.size, currentBoard.liveCells);
		for (let i = 0; i < Number(req.query.generations); i++) {
			returnBoard.progressBoard();
		}
		return res.status(200).json(returnBoard.getState());
	}

	if (req.method === 'PUT') {
		currentBoard.progressBoard();
		return res.status(200).json(currentBoard.getState());
	}

	if (req.method === 'DELETE') {
		if (req.body.steps < currentBoard.states.length) {
			currentBoard.reverseSteps(req.body.steps);
			return res.status(200).json(currentBoard.getState());
		} else {
			return res.status(400).end(`Current board has ${currentBoard.states.length - 1} states back. You have sent ${req.body.steps}`);
		}
	}


	res.status(404).end('Method Not Implemented');
}