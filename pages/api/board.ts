import { NextApiRequest, NextApiResponse } from "next";
import BoardSingleton from "./BoardSingleton";
import { BoardResponse, Cell } from "./Board.interface";

let currentBoard: BoardSingleton;

export default function handler(req: NextApiRequest, res: NextApiResponse<BoardResponse>) {

	if (req.method === 'POST') {
		try {
			currentBoard = new BoardSingleton(req.body.size, req.body.liveCells);
			return res.status(200).json({ liveCells: currentBoard.getState(), size: currentBoard.size, totalSteps:currentBoard.states.length });
		} catch (error) {
			return res.status(400).end(String(error));
		}
	}

	if (!currentBoard) {
		return res.status(400).end('No current board');
	}

	if (req.method === 'GET') {
		if (!req.query.generations) {
			return res.status(200).json({ liveCells: currentBoard.getState(), size: currentBoard.size, totalSteps: currentBoard.states.length });
		}
		let dummyBoard = new BoardSingleton(currentBoard.size, currentBoard.getState());
		for (let i = 0; i < Number(req.query.generations); i++) {
			dummyBoard.progressBoard(true);
		}
		return res.status(200).json({ liveCells: dummyBoard.getState(), size: dummyBoard.size, totalSteps: dummyBoard.states.length });
	}

	if (req.method === 'PUT') {
		currentBoard.progressBoard(true);
		return res.status(200).json({ liveCells: currentBoard.getState(), size: currentBoard.size, totalSteps: currentBoard.states.length });
	}

	if (req.method === 'DELETE') {
		if (req.body.steps < currentBoard.states.length) {
			currentBoard.reverseSteps(req.body.steps);
			return res.status(200).json({ liveCells: currentBoard.getState(), size: currentBoard.size, totalSteps: currentBoard.states.length });
		} else {
			return res.status(400).end(`Current board has ${currentBoard.states.length - 1} states back. You have sent ${req.body.steps}`);
		}
	}


	res.status(404).end('Method Not Implemented');
}